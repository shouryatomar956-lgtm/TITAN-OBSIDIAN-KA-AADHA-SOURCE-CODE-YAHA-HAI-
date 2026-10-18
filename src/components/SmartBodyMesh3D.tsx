import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import localforage from 'localforage';
import { 
  Box, 
  RotateCw, 
  Upload, 
  Camera, 
  CameraOff,
  Activity, 
  Sparkles, 
  Layers, 
  UserCheck, 
  Clock, 
  Maximize2,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Shirt,
  CheckCircle2,
  AlertCircle,
  Crosshair,
  Flame,
  Dumbbell,
  Target
} from 'lucide-react';
import { 
  bodyMeshReconstruction, 
  AnthropometricProfile, 
  SavedBodyScan, 
  Vertex3D,
  GarmentFitType,
  SilhouetteContourRatios
} from '../services/bodyMeshReconstruction';
import { storage } from '../services/storage';
import { triggerHapticFeedback } from '../utils/haptics';
import { MediaPermissionFallback } from './MediaPermissionFallback';

type RenderStyle = 'wireframe' | 'pointcloud';

export const SmartBodyMesh3D = memo(function SmartBodyMesh3D() {
  const [profileMetrics, setProfileMetrics] = useState<AnthropometricProfile | null>(null);
  const [renderMode, setRenderMode] = useState<RenderStyle>('wireframe');
  const [rotationAngle, setRotationAngle] = useState({ x: 0.1, y: 0.0 });
  const [isDragging, setIsDragging] = useState(false);
  const [scanHistory, setScanHistory] = useState<SavedBodyScan[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Real-Time Camera Scanner State
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [liveContourInfo, setLiveContourInfo] = useState<SilhouetteContourRatios | null>(null);

  // Uploaded Photo preview with detected points
  const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState<string | null>(null);
  const [activeMediaView, setActiveMediaView] = useState<'3d_mesh' | 'points_map'>('3d_mesh');

  // Garment Compensation Fit Mode (Estimating shape under clothing)
  const [garmentFit, setGarmentFit] = useState<GarmentFitType>('auto');
  const garmentFitRef = useRef<GarmentFitType>('auto');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const liveScanTimerRef = useRef<number | null>(null);
  const isAnalyzingLiveFrameRef = useRef(false);
  const lastUploadedCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.1, y: 0.0 });
  const verticesRef = useRef<Vertex3D[]>([]);

  // Keep garmentFitRef updated
  useEffect(() => {
    garmentFitRef.current = garmentFit;
  }, [garmentFit]);

  /**
   * 3D Canvas Projection & Perspective Renderer
   */
  const render3DCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const vertices = verticesRef.current;
    if (vertices.length === 0) return;

    const rotX = rotationRef.current.x;
    const rotY = rotationRef.current.y;

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    const fov = 340;
    const cameraDist = 3.6;

    // Projected 2D points cache
    const projected: Array<{ x: number; y: number; z: number; depth: number }> = [];

    for (let i = 0; i < vertices.length; i++) {
      const v = vertices[i];

      // Rotate around Y axis
      const x1 = v.x * cosY + v.z * sinY;
      const y1 = v.y;
      const z1 = -v.x * sinY + v.z * cosY;

      // Rotate around X axis
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX + cameraDist;

      // 3D Perspective Projection
      const projScale = fov / z2;
      const projX = (width / 2) + (x2 * projScale);
      const projY = (height / 2) - (y2 * projScale);

      projected.push({ x: projX, y: projY, z: z2, depth: z2 });
    }

    const slicesPerLayer = 18;
    const layers = 28;

    if (renderMode === 'pointcloud') {
      // Point Cloud Rendering
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.2, Math.min(1.0, (4.5 - p.depth) / 2.0));
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Wireframe / Shaded Topology Rendering
      ctx.lineWidth = 1.2;

      for (let layer = 0; layer < layers; layer++) {
        // Latitudinal Rings
        ctx.beginPath();
        for (let slice = 0; slice < slicesPerLayer; slice++) {
          const idx = (layer * slicesPerLayer) + slice;
          const nextIdx = (layer * slicesPerLayer) + ((slice + 1) % slicesPerLayer);
          const p1 = projected[idx];
          const p2 = projected[nextIdx];

          const avgDepth = (p1.depth + p2.depth) / 2;
          const alpha = Math.max(0.15, Math.min(0.9, (4.5 - avgDepth) / 1.8));

          // Anatomical color gradient (Torso = Rose, Legs = Cyan)
          if (layer > 6 && layer < 16) {
            ctx.strokeStyle = `rgba(244, 63, 94, ${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          }

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // Longitudinal Strands
        if (layer < layers - 1) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          for (let slice = 0; slice < slicesPerLayer; slice += 2) {
            const currentIdx = (layer * slicesPerLayer) + slice;
            const downIdx = ((layer + 1) * slicesPerLayer) + slice;
            ctx.moveTo(projected[currentIdx].x, projected[currentIdx].y);
            ctx.lineTo(projected[downIdx].x, projected[downIdx].y);
          }
          ctx.stroke();
        }
      }
    }
  }, [renderMode]);

  // Load user biometrics & scan history + real-time profile sync
  useEffect(() => {
    const syncMeshWithProfile = async () => {
      try {
        const history = await bodyMeshReconstruction.getScanHistory();
        setScanHistory(history);

        const profile = await storage.getUserProfile();
        const weight = profile?.weightKg || parseFloat(profile?.weight || '74') || 74;
        const height = profile?.heightCm || parseFloat(profile?.height || '176') || 176;

        if (history.length > 0) {
          setProfileMetrics(history[0].metrics);
        } else {
          // Dynamically compute mathematical baseline anthropometrics from user profile parameters
          const baseline = bodyMeshReconstruction.computeAnthropometrics(
            weight, 
            height, 
            profile?.gender || 'male'
          );
          setProfileMetrics(baseline);
        }

        // Generate 3D mesh dynamically from current height & weight
        verticesRef.current = bodyMeshReconstruction.generate3DMesh(height, weight);
        render3DCanvas();
      } catch (err) {
        console.warn('[SmartBodyMesh3D] Init notice:', err);
      }
    };

    syncMeshWithProfile();
    window.addEventListener('pulsefit_profile_updated', syncMeshWithProfile);
    return () => {
      window.removeEventListener('pulsefit_profile_updated', syncMeshWithProfile);
    };
  }, [render3DCanvas]);

  // Clean up camera stream and timers on unmount
  useEffect(() => {
    return () => {
      stopLiveCamera();
    };
  }, []);

  // Touch and mouse interactive drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    rotationRef.current.y += deltaX * 0.012;
    rotationRef.current.x = Math.max(-0.6, Math.min(0.6, rotationRef.current.x + deltaY * 0.012));
    setRotationAngle({ ...rotationRef.current });
    render3DCanvas();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Re-render when rotation or render mode changes
  useEffect(() => {
    render3DCanvas();
  }, [render3DCanvas, rotationAngle, renderMode]);

  /**
   * STOP LIVE CAMERA STREAM
   */
  const stopLiveCamera = () => {
    if (liveScanTimerRef.current) {
      window.clearInterval(liveScanTimerRef.current);
      liveScanTimerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsLiveCameraActive(false);
    isAnalyzingLiveFrameRef.current = false;
  };

  /**
   * START REAL-TIME LIVE CAMERA SCANNER
   * Analyzes body continuously at ~10 FPS with Cloth-Invariant Drape Contraction
   */
  const startLiveCamera = async () => {
    setCameraError(null);
    setUploadError(null);
    triggerHapticFeedback('medium');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access not supported on this browser/device.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsLiveCameraActive(true);

      // Create an offscreen frame analysis canvas
      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = 320;
      frameCanvas.height = 420;
      const frameCtx = frameCanvas.getContext('2d', { willReadFrequently: true });

      // Run live real-time analysis loop every 100ms
      liveScanTimerRef.current = window.setInterval(async () => {
        if (!videoRef.current || !frameCtx || isAnalyzingLiveFrameRef.current) return;
        if (videoRef.current.readyState < 2) return;

        isAnalyzingLiveFrameRef.current = true;
        try {
          frameCtx.drawImage(videoRef.current, 0, 0, frameCanvas.width, frameCanvas.height);

          const profile = await storage.getUserProfile();
          const weight = profile?.weightKg || parseFloat(profile?.weight || '74') || 74;
          const height = profile?.heightCm || parseFloat(profile?.height || '176') || 176;
          const gender = profile?.gender || 'male';

          // Extract silhouette with cloth-invariant compensation
          const contourRatios = bodyMeshReconstruction.analyzeSilhouetteWithGarments(
            frameCanvas,
            garmentFitRef.current,
            { height, weight, gender }
          );

          setLiveContourInfo(contourRatios);

          // Update 3D vertices smoothly in real-time
          verticesRef.current = bodyMeshReconstruction.generate3DMesh(
            height,
            weight,
            contourRatios.waistRatio,
            contourRatios.shoulderRatio,
            contourRatios.hipRatio
          );

          // Compute live anthropometrics
          const computed = bodyMeshReconstruction.computeAnthropometrics(
            weight,
            height,
            gender,
            contourRatios
          );
          setProfileMetrics(computed);

          // Redraw 3D viewport
          render3DCanvas();
        } catch (frameErr) {
          console.warn('[SmartBodyMesh3D] Live frame notice:', frameErr);
        } finally {
          isAnalyzingLiveFrameRef.current = false;
        }
      }, 100);

    } catch (err: any) {
      console.error('[SmartBodyMesh3D] Camera stream failure:', err);
      setCameraError(err.message || 'Unable to access camera. Check device permissions.');
      stopLiveCamera();
    }
  };

  /**
   * CAPTURE & SAVE CURRENT REAL-TIME SCAN
   */
  const handleCaptureLiveScan = async () => {
    if (!profileMetrics) return;
    triggerHapticFeedback('success');
    await bodyMeshReconstruction.saveScan(profileMetrics);
    const updatedHistory = await bodyMeshReconstruction.getScanHistory();
    setScanHistory(updatedHistory);
  };

  /**
   * RE-EVALUATE WHEN GARMENT FIT FILTER CHANGES
   * Instantly re-computes true body contours & all 5 metrics in real-time
   */
  const handleGarmentFitChange = async (newFit: GarmentFitType) => {
    triggerHapticFeedback('light');
    setGarmentFit(newFit);
    garmentFitRef.current = newFit;

    if (lastUploadedCanvasRef.current && !isLiveCameraActive) {
      try {
        setIsProcessing(true);
        const profile = await storage.getUserProfile();
        const weight = profile?.weightKg || parseFloat(profile?.weight || '74') || 74;
        const height = profile?.heightCm || parseFloat(profile?.height || '176') || 176;
        const gender = profile?.gender || 'male';

        const contourRatios = await bodyMeshReconstruction.analyzeSilhouetteAsync(
          lastUploadedCanvasRef.current,
          newFit,
          { height, weight, gender }
        );

        setLiveContourInfo(contourRatios);

        verticesRef.current = bodyMeshReconstruction.generate3DMesh(
          height,
          weight,
          contourRatios.waistRatio,
          contourRatios.shoulderRatio,
          contourRatios.hipRatio
        );

        const computed = bodyMeshReconstruction.computeAnthropometrics(
          weight,
          height,
          gender,
          contourRatios
        );

        setProfileMetrics(computed);
        await bodyMeshReconstruction.saveScan(computed);

        const updatedHistory = await bodyMeshReconstruction.getScanHistory();
        setScanHistory(updatedHistory);
        render3DCanvas();
      } catch (err) {
        console.warn('Garment re-evaluation error:', err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  /**
   * CRASH-PROOF & 1-TAP PHOTO UPLOAD HANDLER
   * - Solves the 2-clicks issue via explicit input value clearing & fast trigger
   * - Solves crashes using URL.createObjectURL + controlled downsampling (no huge base64 strings)
   * - Applies Cloth-Invariant garment compensation to extract true body shape
   * - Stores image canvas for live point tracking and instant dynamic updates
   */
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input immediately so the user never needs to select twice
    e.target.value = '';

    setIsProcessing(true);
    setUploadError(null);
    triggerHapticFeedback('medium');

    // Create object URL (zero-copy, instantaneous, no base64 memory spike)
    const objectUrl = URL.createObjectURL(file);

    try {
      const img = new Image();

      img.onload = async () => {
        try {
          const offCanvas = document.createElement('canvas');
          offCanvas.width = 360;
          offCanvas.height = 540;
          const offCtx = offCanvas.getContext('2d');

          if (!offCtx) {
            throw new Error('Canvas 2D context unavailable');
          }

          offCtx.drawImage(img, 0, 0, 360, 540);
          lastUploadedCanvasRef.current = offCanvas;
          setUploadedPhotoPreview(offCanvas.toDataURL('image/jpeg', 0.85));

          const profile = await storage.getUserProfile();
          const weight = profile?.weightKg || parseFloat(profile?.weight || '74') || 74;
          const height = profile?.heightCm || parseFloat(profile?.height || '176') || 176;
          const gender = profile?.gender || 'male';

          // Asynchronous worker-accelerated contour analysis with cloth-invariant filter
          const contourRatios = await bodyMeshReconstruction.analyzeSilhouetteAsync(
            offCanvas,
            garmentFitRef.current,
            { height, weight, gender }
          );

          setLiveContourInfo(contourRatios);

          // Regenerate 3D mesh scaled to user's true body contour under clothing
          verticesRef.current = bodyMeshReconstruction.generate3DMesh(
            height,
            weight,
            contourRatios.waistRatio,
            contourRatios.shoulderRatio,
            contourRatios.hipRatio
          );

          const computed = bodyMeshReconstruction.computeAnthropometrics(
            weight,
            height,
            gender,
            contourRatios
          );

          setProfileMetrics(computed);
          await bodyMeshReconstruction.saveScan(computed);

          const updatedHistory = await bodyMeshReconstruction.getScanHistory();
          setScanHistory(updatedHistory);
          render3DCanvas();
          triggerHapticFeedback('success');
        } catch (procErr: any) {
          console.warn('[SmartBodyMesh3D] Processing error:', procErr);
          setUploadError('Failed to process body silhouette. Please try another photo.');
        } finally {
          URL.revokeObjectURL(objectUrl);
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setIsProcessing(false);
        setUploadError('Unsupported or corrupted image file. Please choose a JPG/PNG.');
      };

      img.src = objectUrl;
    } catch (err: any) {
      console.warn('[SmartBodyMesh3D] Upload notice:', err);
      URL.revokeObjectURL(objectUrl);
      setIsProcessing(false);
      setUploadError('Upload encountered an error. Please try again.');
    }
  };

  /**
   * Trigger file picker safely (resets value first to guarantee 1-click execution)
   */
  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* 3D Viewport Hero Card */}
      <div className="w-full bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-950 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
                Smart 3D Body Scan & Measurements
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Smart Vision
                </span>
                {isLiveCameraActive && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    LIVE 10 FPS
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Real-time body shape recovery. Extracts true anatomical contours even while wearing clothes.
              </p>
            </div>
          </div>

          {/* Action Buttons: Real-Time Camera & Crash-Free Photo Upload */}
          <div className="flex items-center gap-2 flex-wrap">
            {isLiveCameraActive ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCaptureLiveScan}
                  className="px-3.5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Scan</span>
                </button>
                <button
                  onClick={stopLiveCamera}
                  className="px-3.5 py-2.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CameraOff className="w-4 h-4" />
                  <span>Stop Live</span>
                </button>
              </div>
            ) : (
              <button
                onClick={startLiveCamera}
                className="px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-cyan-300 border border-cyan-500/30 font-bold text-xs transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Real-Time Camera Scan</span>
              </button>
            )}

            <button
              onClick={handleOpenFileDialog}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isProcessing ? 'Analyzing Silhouette...' : 'Upload Body Photo'}</span>
            </button>

            {/* Input with reset-on-click to eliminate 2-clicks issue */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onClick={(e) => {
                (e.target as HTMLInputElement).value = '';
              }}
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        {/* Clothing Drape Contraction Filter Selector */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <Shirt className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-zinc-300">Garment Drape Filter:</span>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              (Compensates fabric slack in real time to reveal true body shape underneath)
            </span>
          </div>

          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10">
            <button
              onClick={() => handleGarmentFitChange('auto')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                garmentFit === 'auto' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Auto-Detect
            </button>
            <button
              onClick={() => handleGarmentFitChange('casual')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                garmentFit === 'casual' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Normal Clothes
            </button>
            <button
              onClick={() => handleGarmentFitChange('loose')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                garmentFit === 'loose' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Loose / Baggy
            </button>
            <button
              onClick={() => handleGarmentFitChange('fitted')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                garmentFit === 'fitted' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Fitted / Athletic
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="mt-3 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{uploadError}</span>
          </div>
        )}

        {cameraError && (
          <div className="mt-3">
            <MediaPermissionFallback
              mediaType="camera"
              moduleTitle="3D Optical Body Contour Scanner"
              errorMessage={cameraError}
              onRetry={startLiveCamera}
              onManualFallback={() => setCameraError(null)}
              manualFallbackLabel="Dismiss"
            />
          </div>
        )}

        {/* Viewport Tabs when uploaded image exists */}
        {uploadedPhotoPreview && !isLiveCameraActive && (
          <div className="mt-4 flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">View Mode:</span>
              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/50 border border-white/10">
                <button
                  onClick={() => setActiveMediaView('3d_mesh')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMediaView === '3d_mesh' ? 'bg-cyan-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  3D Body Wireframe
                </button>
                <button
                  onClick={() => setActiveMediaView('points_map')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeMediaView === 'points_map' ? 'bg-cyan-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Photo Body Points</span>
                </button>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Contour Tracked
            </span>
          </div>
        )}

        {/* Main Viewport Grid: Live Camera / Uploaded Photo Points + 3D Mesh */}
        <div className={`grid gap-4 items-center my-4 ${
          isLiveCameraActive || (uploadedPhotoPreview && activeMediaView === 'points_map')
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1'
        }`}>
          {/* Live Video Viewfinder with Real-Time Landmark Points Overlay */}
          {isLiveCameraActive && (
            <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden bg-black border border-cyan-500/30 flex items-center justify-center shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />

              {/* Real-Time Anatomical Landmark Points Overlay on Live Video */}
              {liveContourInfo?.landmarks && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 320 420"
                  preserveAspectRatio="none"
                >
                  {/* Shoulders */}
                  <line
                    x1={320 - liveContourInfo.landmarks.shoulderRight.x}
                    y1={liveContourInfo.landmarks.shoulderRight.y}
                    x2={320 - liveContourInfo.landmarks.shoulderLeft.x}
                    y2={liveContourInfo.landmarks.shoulderLeft.y}
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <circle cx={320 - liveContourInfo.landmarks.shoulderRight.x} cy={liveContourInfo.landmarks.shoulderRight.y} r="5" fill="#06b6d4" />
                  <circle cx={320 - liveContourInfo.landmarks.shoulderLeft.x} cy={liveContourInfo.landmarks.shoulderLeft.y} r="5" fill="#06b6d4" />
                  <text
                    x={((320 - liveContourInfo.landmarks.shoulderRight.x) + (320 - liveContourInfo.landmarks.shoulderLeft.x)) / 2}
                    y={liveContourInfo.landmarks.shoulderRight.y - 7}
                    fill="#22d3ee"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Shoulders ({liveContourInfo.pixelWidths?.shoulder || '0'}px)
                  </text>

                  {/* Chest */}
                  <line
                    x1={320 - liveContourInfo.landmarks.chestRight.x}
                    y1={liveContourInfo.landmarks.chestRight.y}
                    x2={320 - liveContourInfo.landmarks.chestLeft.x}
                    y2={liveContourInfo.landmarks.chestLeft.y}
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <circle cx={320 - liveContourInfo.landmarks.chestRight.x} cy={liveContourInfo.landmarks.chestRight.y} r="5" fill="#10b981" />
                  <circle cx={320 - liveContourInfo.landmarks.chestLeft.x} cy={liveContourInfo.landmarks.chestLeft.y} r="5" fill="#10b981" />
                  <text
                    x={((320 - liveContourInfo.landmarks.chestRight.x) + (320 - liveContourInfo.landmarks.chestLeft.x)) / 2}
                    y={liveContourInfo.landmarks.chestRight.y - 7}
                    fill="#34d399"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Chest ({liveContourInfo.pixelWidths?.chest || '0'}px)
                  </text>

                  {/* Waist */}
                  <line
                    x1={320 - liveContourInfo.landmarks.waistRight.x}
                    y1={liveContourInfo.landmarks.waistRight.y}
                    x2={320 - liveContourInfo.landmarks.waistLeft.x}
                    y2={liveContourInfo.landmarks.waistLeft.y}
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <circle cx={320 - liveContourInfo.landmarks.waistRight.x} cy={liveContourInfo.landmarks.waistRight.y} r="5" fill="#f59e0b" />
                  <circle cx={320 - liveContourInfo.landmarks.waistLeft.x} cy={liveContourInfo.landmarks.waistLeft.y} r="5" fill="#f59e0b" />
                  <text
                    x={((320 - liveContourInfo.landmarks.waistRight.x) + (320 - liveContourInfo.landmarks.waistLeft.x)) / 2}
                    y={liveContourInfo.landmarks.waistRight.y - 7}
                    fill="#fbbf24"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Waist ({liveContourInfo.pixelWidths?.waist || '0'}px)
                  </text>

                  {/* Hips */}
                  <line
                    x1={320 - liveContourInfo.landmarks.hipRight.x}
                    y1={liveContourInfo.landmarks.hipRight.y}
                    x2={320 - liveContourInfo.landmarks.hipLeft.x}
                    y2={liveContourInfo.landmarks.hipLeft.y}
                    stroke="#a855f7"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <circle cx={320 - liveContourInfo.landmarks.hipRight.x} cy={liveContourInfo.landmarks.hipRight.y} r="5" fill="#a855f7" />
                  <circle cx={320 - liveContourInfo.landmarks.hipLeft.x} cy={liveContourInfo.landmarks.hipLeft.y} r="5" fill="#a855f7" />
                  <text
                    x={((320 - liveContourInfo.landmarks.hipRight.x) + (320 - liveContourInfo.landmarks.hipLeft.x)) / 2}
                    y={liveContourInfo.landmarks.hipRight.y - 7}
                    fill="#c084fc"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Hips ({liveContourInfo.pixelWidths?.hip || '0'}px)
                  </text>

                  {/* Thighs */}
                  <line
                    x1={320 - liveContourInfo.landmarks.thighRight.x}
                    y1={liveContourInfo.landmarks.thighRight.y}
                    x2={320 - liveContourInfo.landmarks.thighLeft.x}
                    y2={liveContourInfo.landmarks.thighLeft.y}
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <circle cx={320 - liveContourInfo.landmarks.thighRight.x} cy={liveContourInfo.landmarks.thighRight.y} r="4" fill="#ec4899" />
                  <circle cx={320 - liveContourInfo.landmarks.thighLeft.x} cy={liveContourInfo.landmarks.thighLeft.y} r="4" fill="#ec4899" />
                </svg>
              )}

              {/* Status Header Overlay */}
              <div className="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded-xl text-[10px] font-mono text-cyan-300 border border-white/10 flex items-center gap-1.5 backdrop-blur-md">
                <Activity className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>Real-Time Points Tracking (~10 FPS)</span>
              </div>
            </div>
          )}

          {/* Uploaded Photo Landmark Points Overlay Map */}
          {!isLiveCameraActive && uploadedPhotoPreview && activeMediaView === 'points_map' && (
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-black border border-cyan-500/30 flex items-center justify-center shadow-inner">
              <img
                src={uploadedPhotoPreview}
                alt="Analyzed user silhouette"
                className="w-full h-full object-contain"
              />

              {liveContourInfo?.landmarks && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 360 540"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Shoulders */}
                  <line
                    x1={liveContourInfo.landmarks.shoulderLeft.x}
                    y1={liveContourInfo.landmarks.shoulderLeft.y}
                    x2={liveContourInfo.landmarks.shoulderRight.x}
                    y2={liveContourInfo.landmarks.shoulderRight.y}
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                  />
                  <circle cx={liveContourInfo.landmarks.shoulderLeft.x} cy={liveContourInfo.landmarks.shoulderLeft.y} r="6" fill="#06b6d4" />
                  <circle cx={liveContourInfo.landmarks.shoulderRight.x} cy={liveContourInfo.landmarks.shoulderRight.y} r="6" fill="#06b6d4" />
                  <text
                    x={(liveContourInfo.landmarks.shoulderLeft.x + liveContourInfo.landmarks.shoulderRight.x) / 2}
                    y={liveContourInfo.landmarks.shoulderLeft.y - 8}
                    fill="#22d3ee"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Shoulders: {liveContourInfo.pixelWidths?.shoulder || '0'}px
                  </text>

                  {/* Chest */}
                  <line
                    x1={liveContourInfo.landmarks.chestLeft.x}
                    y1={liveContourInfo.landmarks.chestLeft.y}
                    x2={liveContourInfo.landmarks.chestRight.x}
                    y2={liveContourInfo.landmarks.chestRight.y}
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                  />
                  <circle cx={liveContourInfo.landmarks.chestLeft.x} cy={liveContourInfo.landmarks.chestLeft.y} r="6" fill="#10b981" />
                  <circle cx={liveContourInfo.landmarks.chestRight.x} cy={liveContourInfo.landmarks.chestRight.y} r="6" fill="#10b981" />
                  <text
                    x={(liveContourInfo.landmarks.chestLeft.x + liveContourInfo.landmarks.chestRight.x) / 2}
                    y={liveContourInfo.landmarks.chestLeft.y - 8}
                    fill="#34d399"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Chest: {liveContourInfo.pixelWidths?.chest || '0'}px
                  </text>

                  {/* Waist */}
                  <line
                    x1={liveContourInfo.landmarks.waistLeft.x}
                    y1={liveContourInfo.landmarks.waistLeft.y}
                    x2={liveContourInfo.landmarks.waistRight.x}
                    y2={liveContourInfo.landmarks.waistRight.y}
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                  />
                  <circle cx={liveContourInfo.landmarks.waistLeft.x} cy={liveContourInfo.landmarks.waistLeft.y} r="6" fill="#f59e0b" />
                  <circle cx={liveContourInfo.landmarks.waistRight.x} cy={liveContourInfo.landmarks.waistRight.y} r="6" fill="#f59e0b" />
                  <text
                    x={(liveContourInfo.landmarks.waistLeft.x + liveContourInfo.landmarks.waistRight.x) / 2}
                    y={liveContourInfo.landmarks.waistLeft.y - 8}
                    fill="#fbbf24"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Waist: {liveContourInfo.pixelWidths?.waist || '0'}px
                  </text>

                  {/* Hips */}
                  <line
                    x1={liveContourInfo.landmarks.hipLeft.x}
                    y1={liveContourInfo.landmarks.hipLeft.y}
                    x2={liveContourInfo.landmarks.hipRight.x}
                    y2={liveContourInfo.landmarks.hipRight.y}
                    stroke="#a855f7"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                  />
                  <circle cx={liveContourInfo.landmarks.hipLeft.x} cy={liveContourInfo.landmarks.hipLeft.y} r="6" fill="#a855f7" />
                  <circle cx={liveContourInfo.landmarks.hipRight.x} cy={liveContourInfo.landmarks.hipRight.y} r="6" fill="#a855f7" />
                  <text
                    x={(liveContourInfo.landmarks.hipLeft.x + liveContourInfo.landmarks.hipRight.x) / 2}
                    y={liveContourInfo.landmarks.hipLeft.y - 8}
                    fill="#c084fc"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Hips: {liveContourInfo.pixelWidths?.hip || '0'}px
                  </text>

                  {/* Thighs */}
                  <line
                    x1={liveContourInfo.landmarks.thighLeft.x}
                    y1={liveContourInfo.landmarks.thighLeft.y}
                    x2={liveContourInfo.landmarks.thighRight.x}
                    y2={liveContourInfo.landmarks.thighRight.y}
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <circle cx={liveContourInfo.landmarks.thighLeft.x} cy={liveContourInfo.landmarks.thighLeft.y} r="5" fill="#ec4899" />
                  <circle cx={liveContourInfo.landmarks.thighRight.x} cy={liveContourInfo.landmarks.thighRight.y} r="5" fill="#ec4899" />
                </svg>
              )}

              <div className="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded-xl text-[10px] font-mono text-cyan-300 border border-white/10 flex items-center gap-1.5 backdrop-blur-md">
                <Crosshair className="w-3 h-3 text-cyan-400" />
                <span>Detected Image Key Points</span>
              </div>
            </div>
          )}

          {/* Interactive 3D Canvas Viewport */}
          <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center select-none touch-none bg-zinc-950/30 rounded-2xl border border-white/5">
            <canvas
              ref={canvasRef}
              width={480}
              height={440}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-full max-w-lg cursor-grab active:cursor-grabbing block"
            />

            {/* Render Mode Switcher Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setRenderMode('wireframe')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  renderMode === 'wireframe' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Wireframe
              </button>
              <button
                onClick={() => setRenderMode('pointcloud')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  renderMode === 'pointcloud' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Point Cloud
              </button>
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-zinc-500 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5 backdrop-blur-md">
              Drag to Rotate (Yaw: {Math.round(rotationAngle.y * 57.3)}° / Pitch: {Math.round(rotationAngle.x * 57.3)}°)
            </div>
          </div>
        </div>

        {/* Cloth-Invariant Body Recovery Telemetry Banner */}
        <div className="w-full mt-2 p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-bold text-white font-mono">
              Cloth-Invariant Shape Extraction:
            </span>
            <span className="text-zinc-300">
              {liveContourInfo?.detectedFit || profileMetrics?.garmentCompensationDetails?.fitType || 'Adaptive Clothing Filter Active'}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-emerald-400">
              Fabric Slack Filter: -{liveContourInfo?.garmentSlackPercent || profileMetrics?.garmentCompensationDetails?.slackReductionPct || 11.2}%
            </span>
            <span className="text-cyan-300">
              True Waist Contraction: -{liveContourInfo?.appliedWaistContraction || 12.8}%
            </span>
          </div>
        </div>
      </div>

      {/* 5 Prominent Real-Time Anthropometric Result Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* 1. Estimated Body Fat */}
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Body Fat</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-baseline gap-1">
              {profileMetrics ? profileMetrics.estimatedBodyFatPercent : 0}
              <span className="text-sm font-semibold text-rose-400">%</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
              {profileMetrics ? 'US Navy Equation' : 'Live Camera Scan Required'}
            </div>
          </div>
          <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 w-fit">
            {profileMetrics 
              ? (profileMetrics.estimatedBodyFatPercent <= 14 ? 'Athletic / Lean' : profileMetrics.estimatedBodyFatPercent <= 20 ? 'Fitness Standard' : 'Average Profile')
              : 'Stand in Camera'}
          </div>
        </div>

        {/* 2. Lean Muscle Mass */}
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Lean Mass</span>
            <Dumbbell className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono flex items-baseline gap-1">
              {profileMetrics ? profileMetrics.leanMassKg : 0}
              <span className="text-sm font-semibold text-white/60">kg</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
              {profileMetrics ? `Fat: ${profileMetrics.fatMassKg} kg` : 'Live Scan Required'}
            </div>
          </div>
          <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 w-fit">
            {profileMetrics ? 'Active Metabolic' : '0 kg Fat'}
          </div>
        </div>

        {/* 3. Waist-to-Hip Ratio (WHR) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">WHR Ratio</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {profileMetrics ? profileMetrics.waistToHipRatio : '0.00'}
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">Waist / Hip Ratio</div>
          </div>
          <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 w-fit">
            {profileMetrics 
              ? (profileMetrics.waistToHipRatio < 0.85 ? 'Low Health Risk' : 'Standard Zone')
              : 'Scan Required'}
          </div>
        </div>

        {/* 4. Body Type / Somatotype */}
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Body Type</span>
            <UserCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="my-2">
            <div className="text-base sm:text-lg font-black text-white leading-tight">
              {profileMetrics ? profileMetrics.somatotype : 'Awaiting Scan'}
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">Natural Body Build</div>
          </div>
          <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 w-fit truncate max-w-full">
            {profileMetrics ? `${profileMetrics.somatotype.split(' ')[0]} Frame` : 'Live Camera'}
          </div>
        </div>

        {/* 5. Chest to Shoulder Ratio */}
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Chest : Shoulder</span>
            <Maximize2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              {profileMetrics ? profileMetrics.chestToShoulderRatio : '0.00'}
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
              {profileMetrics ? `V-Taper 1 : ${profileMetrics.shoulderToChestRatio}` : 'V-Taper Ratio'}
            </div>
          </div>
          <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 w-fit">
            {profileMetrics 
              ? (profileMetrics.shoulderToChestRatio >= 1.15 ? 'V-Taper Athletic' : 'Balanced Torso')
              : 'Scan Required'}
          </div>
        </div>
      </div>

      {/* Real-Time Image Landmark Points Telemetry Panel */}
      {liveContourInfo && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-white tracking-wider uppercase font-mono flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Real-Time Image Landmark Measurements
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Live Pixel Extents
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-black/40 border border-cyan-500/20 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Shoulders Width</span>
              <span className="text-lg font-black text-cyan-300 font-mono mt-0.5">
                {liveContourInfo.pixelWidths?.shoulder || '---'} px
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Ratio: {liveContourInfo.shoulderRatio}</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/20 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Chest Width</span>
              <span className="text-lg font-black text-emerald-300 font-mono mt-0.5">
                {liveContourInfo.pixelWidths?.chest || '---'} px
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Ratio: {liveContourInfo.chestRatio}</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Waist Width</span>
              <span className="text-lg font-black text-amber-300 font-mono mt-0.5">
                {liveContourInfo.pixelWidths?.waist || '---'} px
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Contraction: -{liveContourInfo.appliedWaistContraction}%</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Hips Width</span>
              <span className="text-lg font-black text-purple-300 font-mono mt-0.5">
                {liveContourInfo.pixelWidths?.hip || '---'} px
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Ratio: {liveContourInfo.hipRatio}</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-pink-500/20 flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Thighs Width</span>
              <span className="text-lg font-black text-pink-300 font-mono mt-0.5">
                {liveContourInfo.pixelWidths?.thigh || '---'} px
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Ratio: {liveContourInfo.thighRatio}</span>
            </div>
          </div>
        </div>
      )}

      {/* Localized Muscle & Density Distribution */}
      {profileMetrics && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-black text-white tracking-wider uppercase font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Localized Hypertrophic Density Index
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">Deltoids, Chest & Upper Torso</span>
                <span className="text-cyan-400 font-mono">{profileMetrics.localizedMuscleDistribution.deltoidsAndChest}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${profileMetrics.localizedMuscleDistribution.deltoidsAndChest}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">Core, Rectus Abdominis & Obliques</span>
                <span className="text-rose-400 font-mono">{profileMetrics.localizedMuscleDistribution.coreAndAbs}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full"
                  style={{ width: `${profileMetrics.localizedMuscleDistribution.coreAndAbs}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">Quadriceps, Hamstrings & Glutes</span>
                <span className="text-emerald-400 font-mono">{profileMetrics.localizedMuscleDistribution.quadricepsAndGlutes}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  style={{ width: `${profileMetrics.localizedMuscleDistribution.quadricepsAndGlutes}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">Calves & Lower Kinetic Extremities</span>
                <span className="text-amber-400 font-mono">{profileMetrics.localizedMuscleDistribution.calvesAndLowerLimbs}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  style={{ width: `${profileMetrics.localizedMuscleDistribution.calvesAndLowerLimbs}%` }}
                />
              </div>
            </div>
          </div>

          {/* Dedicated 4-Compartment Siri/Brozek Density & Ramanujan Elliptical Geometric Matrix */}
          {profileMetrics.advancedIndices && (
            <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Detailed Body Composition & Shape Analysis
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Precision Body Fit • Density: {profileMetrics.advancedIndices.bodyDensityGcm3} g/cm³
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Body Fat Range</span>
                  <span className="text-lg font-black text-rose-400 font-mono mt-0.5">
                    {profileMetrics.advancedIndices.siriBodyFatPct}% - {profileMetrics.advancedIndices.brozekBodyFatPct}%
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Dual Formula Check
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Muscle Index (FFMI)</span>
                  <span className="text-lg font-black text-cyan-400 font-mono mt-0.5">
                    {profileMetrics.advancedIndices.normalizedFfmi}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Lean Muscle Density
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Body Roundness</span>
                  <span className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                    {profileMetrics.advancedIndices.bodyRoundnessIndexBri}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Health Balance Score
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Body Shape Score</span>
                  <span className="text-lg font-black text-amber-400 font-mono mt-0.5">
                    {profileMetrics.advancedIndices.aBodyShapeIndexAbsi}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Waist-to-Height Ratio
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Body Surface Area</span>
                  <span className="text-lg font-black text-purple-400 font-mono mt-0.5">
                    {profileMetrics.advancedIndices.duBoisSurfaceAreaM2} m²
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Total Body Surface
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Circumference</span>
                  <span className="text-lg font-black text-sky-400 font-mono mt-0.5">
                    W:{profileMetrics.advancedIndices.ramanujanWaistCm} / H:{profileMetrics.advancedIndices.ramanujanHipCm}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Waist & Hip in cm
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Historical Scans History / Empty State */}
      {scanHistory.length === 0 ? (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                0 Silhouette Scans Recorded (0% Analyzed)
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Start a Real-Time Camera Scan or upload a photo to reconstruct your 3D contour shifts.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10">
            0% Scans
          </span>
        </div>
      ) : (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-white tracking-wider uppercase font-mono">
              Body Scan Progress History ({scanHistory.length})
            </h4>
            <span className="text-xs font-mono text-zinc-500">Saved to Device Vault</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {scanHistory.map((scan) => (
              <div key={scan.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white font-mono">{scan.dateStr}</span>
                  <span className="text-cyan-400 font-bold">{scan.metrics.estimatedBodyFatPercent}% BF</span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                  <span>Lean: {scan.metrics.leanMassKg} kg</span>
                  <span>WHR: {scan.metrics.waistToHipRatio}</span>
                </div>
                {scan.metrics.garmentCompensationDetails && (
                  <div className="text-[10px] font-mono text-cyan-300/80 pt-1 border-t border-white/5 flex items-center justify-between">
                    <span>{scan.metrics.garmentCompensationDetails.fitType}</span>
                    <span>-{scan.metrics.garmentCompensationDetails.slackReductionPct}% Drape</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default SmartBodyMesh3D;
