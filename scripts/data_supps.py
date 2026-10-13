# Real Gym Supplements for Pre and Post Workout

PRE_SUPP_BASE = [
    ("Whey Protein Isolate (Chocolate Flavor)", "Whey Isolate Chocolate", "1 scoop (30g) in 200ml water", 115, 26.0, 1.5, 0.5, "30-45 min pehle", "Fast absorbing muscle protection amino acids", "Shaker mein thande paani ke sath shake karein."),
    ("Whey Protein Isolate (Vanilla Flavor)", "Whey Isolate Vanilla", "1 scoop (30g) in 200ml water", 115, 26.0, 1.5, 0.5, "30-45 min pehle", "Clean lean protein fuel for tough sessions", "Shaker mein 200ml paani ke sath mix karein."),
    ("Whey Protein Isolate (Cafe Mocha)", "Whey Isolate Cafe Mocha", "1 scoop (30g) in 200ml water", 115, 26.0, 1.5, 0.5, "30-45 min pehle", "Coffee flavor protein kick before gym", "Chilled water mein shake karein."),
    ("Whey Protein Isolate (Alphonso Mango)", "Whey Isolate Aam Flavor", "1 scoop (30g) in 200ml water", 115, 26.0, 1.5, 0.5, "30-45 min pehle", "Refreshing tropical taste aur pure protein", "Paani mein mix karke piyein."),
    ("Whey Protein Isolate (Raw Unflavored)", "Raw Whey Isolate", "1 scoop (30g) in 200ml water", 112, 27.0, 0.8, 0.3, "30-40 min pehle", "Zero sweetener pure unadulterated protein", "Paani ya fruit juice mein mix karein."),
    ("Whey Protein Concentrate (Rich Chocolate)", "Whey Concentrate Chocolate", "1 scoop (33g) in 250ml water", 130, 24.0, 3.0, 1.8, "40-50 min pehle", "Wholesome muscle protein support", "Shaker mein 250ml paani ke sath mix karein."),
    ("Whey Protein Concentrate (Malai Kulfi)", "Whey Concentrate Kulfi", "1 scoop (33g) in 250ml water", 130, 24.0, 3.0, 1.8, "40-50 min pehle", "Desi kulfi flavor delicious protein drink", "Cold water mein shake karke lein."),
    ("Hydrolyzed Whey Isolate (Chocolate)", "Hydrolyzed Whey", "1 scoop (30g) in 200ml water", 110, 27.0, 0.5, 0.2, "20-30 min pehle", "Ultra-fast direct muscle amino delivery", "Paani mein shake karein aur turant piyein."),
    ("Plant Protein Pea & Rice (Chocolate)", "Plant Protein Chocolate", "1 scoop (35g) in 250ml water", 135, 25.0, 4.0, 2.0, "35-45 min pehle", "Dairy-free clean vegan muscle fuel", "Shaker mein paani ke sath mix karein."),

    ("Creatine Monohydrate 3g (Pure Micronized)", "Creatine Monohydrate 3g", "1 scoop (3g) in 200ml water", 0, 0, 0, 0, "20-30 min pehle", "Muscle strength, power output aur cell volume", "Paani ya juice mein ghol kar piyein."),
    ("Creatine Monohydrate 5g (Pure Micronized)", "Creatine Monohydrate 5g", "1 scoop (5g) in 250ml water", 0, 0, 0, 0, "20-30 min pehle", "Heavy compound lifting ke liye strength & power", "Gungune paani ya glucose drink mein lein."),
    ("Creapure Micronized German Creatine 3g", "Creapure Creatine 3g", "1 scoop (3g) in 200ml water", 0, 0, 0, 0, "20-30 min pehle", "Purest German grade strength booster", "Shaker mein paani ke sath ghol kar piyein."),
    ("Creapure Micronized German Creatine 5g", "Creapure Creatine 5g", "1 scoop (5g) in 250ml water", 0, 0, 0, 0, "20-30 min pehle", "Maximum powerlifting strength support", "Paani ke sath workout se pehle lein."),
    ("Creatine HCL 1.5g (Micro Dose)", "Creatine HCL 1.5g", "1 scoop (1.5g) in 200ml water", 0, 0, 0, 0, "15-25 min pehle", "No bloating fast-absorbing creatine", "200ml paani mein ghol kar piyein."),

    ("Pure L-Citrulline 3g Powder", "L-Citrulline 3g", "1 scoop (3g) in 250ml water", 0, 0, 0, 0, "25-35 min pehle", "Muscle blood flow aur intense pump", "Chilled water mein mix karke piyein."),
    ("Pure L-Citrulline 5g Powder", "L-Citrulline 5g", "1 scoop (5g) in 300ml water", 0, 0, 0, 0, "30-40 min pehle", "Maximum vascular dilation aur endurance", "Workout se aadha ghanta pehle lein."),
    ("Citrulline Malate 2:1 (4g Powder)", "Citrulline Malate 4g", "1 scoop (4g) in 250ml water", 5, 0, 1.0, 0, "25-35 min pehle", "Lactic acid buffer aur full muscle pump", "250ml thande paani mein shake karein."),
    ("Citrulline Malate 2:1 (6g Dose)", "Citrulline Malate 6g", "1 scoop (6g) in 300ml water", 8, 0, 1.5, 0, "30-40 min pehle", "Heavy workout ke liye peak blood circulation", "Paani ke sath workout se 30 min pehle lein."),
    ("L-Arginine 3000mg Powder", "L-Arginine 3g", "1 scoop (3g) in 250ml water", 0, 0, 0, 0, "25-35 min pehle", "Blood circulation aur natural workout pump", "Paani mein ghol kar piyein."),

    ("Beta-Alanine 1.6g Powder", "Beta-Alanine 1.6g", "1 scoop (1.6g) in 200ml water", 0, 0, 0, 0, "20-30 min pehle", "Mild tingling sensation aur muscle stamina", "Paani mein mix karke piyein."),
    ("Beta-Alanine 2.4g Powder", "Beta-Alanine 2.4g", "1 scoop (2.4g) in 250ml water", 0, 0, 0, 0, "20-30 min pehle", "Muscle fatigue delay aur high reps endurance", "Paani ke sath ghol kar lein."),
    ("Beta-Alanine 3.2g (Full Clinical Dose)", "Beta-Alanine 3.2g", "1 scoop (3.2g) in 300ml water", 0, 0, 0, 0, "25-35 min pehle", "High intensity muscular endurance & stamina", "Cold water mein shake karke piyein."),

    ("Caffeine 100mg Tablet", "Caffeine 100mg", "1 tablet", 0, 0, 0, 0, "20-30 min pehle", "Mild mental alertness aur workout focus", "1 glass paani ke sath nigal lein."),
    ("Caffeine 200mg Capsule", "Caffeine 200mg", "1 capsule", 0, 0, 0, 0, "25-35 min pehle", "Strong workout energy aur fatigue resistance", "Paani ke sath workout se 25 min pehle lein."),
    ("Caffeine 200mg + L-Theanine 100mg Stack", "Caffeine + L-Theanine", "1 capsule", 0, 0, 0, 0, "25-35 min pehle", "Clean jitter-free laser focus aur gym drive", "Paani ke sath consume karein."),
    ("L-Carnitine L-Tartrate 1500mg Liquid", "L-Carnitine 1500mg", "1 tablespoon (15ml)", 0, 0, 0, 0, "20-30 min pehle", "Fat mobilization aur clean workout energy", "Direct ya paani mein milakar piyein."),
    ("Taurine 1000mg Powder", "Taurine 1g", "1 scoop (1g) in 200ml water", 0, 0, 0, 0, "20-30 min pehle", "Cellular hydration aur muscle contractility", "Paani mein mix karke piyein."),

    ("Pre-Workout Formula (Watermelon Blast)", "Pre-Workout Watermelon", "1 scoop (10g) in 300ml water", 15, 0, 3.5, 0, "20-30 min pehle", "Intense gym energy, heavy lifting drive", "Cold water mein 10 second shake karein."),
    ("Pre-Workout Formula (Green Apple Rush)", "Pre-Workout Green Apple", "1 scoop (10g) in 300ml water", 15, 0, 3.5, 0, "20-30 min pehle", "Tangy green apple punch for heavy gym sets", "Thande paani mein shake karein."),
    ("Pre-Workout Formula (Blue Raspberry)", "Pre-Workout Blue Razz", "1 scoop (10g) in 300ml water", 15, 0, 3.5, 0, "20-30 min pehle", "Electric blue energy rush before lifting", "Chilled water mein shake karein."),
    ("Pre-Workout Formula (Fruit Punch)", "Pre-Workout Fruit Punch", "1 scoop (10g) in 300ml water", 15, 0, 3.5, 0, "20-30 min pehle", "Classic fruit punch workout power drink", "Shaker mein shake karke piyein."),
    ("Non-Stim Pump Pre-Workout (Berry)", "Non-Stim Pump Berry", "1 scoop (12g) in 300ml water", 18, 0, 4.0, 0, "25-35 min pehle", "Evening workout pure blood pump bina sleeplessness", "Chilled water mein shake karein."),

    ("BCAA 2:1:1 Powder (Watermelon)", "BCAA Watermelon", "1 scoop (7g) in 400ml water", 15, 5.0, 1.0, 0, "15-30 min pehle", "Intra/pre-workout muscle anti-catabolism", "Chilled water shaker mein mix karein."),
    ("BCAA 2:1:1 Powder (Green Apple)", "BCAA Green Apple", "1 scoop (7g) in 400ml water", 15, 5.0, 1.0, 0, "15-30 min pehle", "Refreshing taste aur muscle recovery support", "Paani mein shake karein."),
    ("EAA 9 Essential Aminos (Fruit Punch)", "EAA Fruit Punch", "1 scoop (10g) in 400ml water", 20, 7.5, 1.5, 0, "20-30 min pehle", "Full spectrum muscle protection fuel", "Thande paani ke sath sip karein."),

    ("Fast&Up Reload Effervescent Tablet (Orange)", "Fast&Up Orange Fizz", "1 tablet in 500ml water", 12, 0, 3.0, 0, "15-25 min pehle", "Rapid hydration aur muscle cramp prevention", "Paani mein drop karein aur fizz hone par piyein."),
    ("Fast&Up Reload Effervescent Tablet (Cola)", "Fast&Up Cola Fizz", "1 tablet in 500ml water", 12, 0, 3.0, 0, "15-25 min pehle", "Tasty electrolyte fizz for sweaty workouts", "500ml paani mein ghol kar piyein."),
    ("ORS Hydration Sachet (Orange Flavor)", "ORS Orange Sachet", "1 sachet in 200ml water", 45, 0, 11.0, 0, "15-25 min pehle", "Clinical rehydration formula with sodium & glucose", "Paani mein ghol kar workout se pehle lein."),
    ("Dextrose Monohydrate 25g Fast Carbs", "Dextrose 25g Powder", "25g in 300ml water", 95, 0, 24.0, 0, "15-25 min pehle", "Rapid blood sugar surge for explosive power", "Paani mein ghol kar piyein."),
    ("Cluster Dextrin 25g Powder", "Cluster Dextrin 25g", "1 scoop (25g) in 350ml water", 95, 0, 24.0, 0, "20-30 min pehle", "Zero stomach bloating sustained endurance carbs", "Paani mein ghol kar piyein."),
    ("Whey Protein Bar (20g Protein, Chocolate)", "Whey Bar Chocolate", "1 bar (60g)", 220, 20.0, 22.0, 7.0, "45-60 min pehle", "Complete portable protein and sustained carb fuel", "Wrapper khol kar chaba kar khayein.")
]

POST_SUPP_BASE = [
    ("Whey Protein Isolate (Triple Chocolate)", "Whey Isolate Chocolate", "1 scoop (30g) in 250ml water", 115, 26.0, 1.5, 0.5, "Workout ke 20-30 min baad", "Fast-absorbing recovery protein", "Shaker mein thande paani ke sath shake karein."),
    ("Whey Protein Isolate (French Vanilla)", "Whey Isolate Vanilla", "1 scoop (30g) in 250ml water", 115, 26.0, 1.5, 0.5, "Workout ke 20-30 min baad", "Pure amino acid delivery for muscle repair", "Chilled water mein shake karke piyein."),
    ("Whey Protein Isolate (Cafe Latte)", "Whey Isolate Cafe Latte", "1 scoop (30g) in 250ml water", 115, 26.0, 1.5, 0.5, "Workout ke 20-30 min baad", "Post-workout muscle repair with coffee aroma", "Shaker mein shake karein."),
    ("Whey Protein Isolate (Alphonso Mango)", "Whey Isolate Alphonso Mango", "1 scoop (30g) in 250ml water", 115, 26.0, 1.5, 0.5, "Workout ke 20-30 min baad", "Refreshing post-training protein drink", "Cold water mein shake karke lein."),
    ("Whey Protein Isolate (Raw Unflavored)", "Raw Whey Isolate", "1 scoop (30g) in 250ml water", 112, 27.0, 0.8, 0.3, "Workout ke 20-30 min baad", "Zero sweetener pure isolate for direct recovery", "Paani ya fruit shake mein mix karein."),
    ("Whey Protein Concentrate (Chocolate Fudge)", "Whey Concentrate Chocolate", "1 scoop (33g) in 250ml water", 130, 24.0, 3.0, 1.8, "Workout ke 30-40 min baad", "Sustained amino acid release for muscle synthesis", "Shaker mein mix karke piyein."),
    ("Whey Protein Concentrate (Malai Kulfi)", "Whey Concentrate Malai Kulfi", "1 scoop (33g) in 250ml water", 130, 24.0, 3.0, 1.8, "Workout ke 30-40 min baad", "Desi taste delicious recovery shake", "Thande paani ya doodh mein shake karein."),
    ("Hydrolyzed Whey Protein (Ultra Fast)", "Hydrolyzed Whey Protein", "1 scoop (30g) in 200ml water", 110, 27.0, 0.5, 0.2, "Workout ke 15-25 min baad", "Pre-digested rapid peptides for immediate recovery", "Paani mein shake karein aur turant piyein."),
    ("Plant Protein Isolate (Pea & Brown Rice)", "Plant Protein Chocolate", "1 scoop (35g) in 300ml water", 135, 25.0, 4.0, 2.0, "Workout ke 30-40 min baad", "Complete plant amino acid profile for vegans", "Shaker mein shake karke piyein."),
    ("Mass Gainer Protein Shake (Chocolate)", "Mass Gainer Chocolate", "1 scoop (75g) in 350ml milk", 360, 25.0, 58, 4.5, "Workout ke 30-45 min baad", "Heavy glycogen refuel and muscle bulk rebuilding", "Shaker mein doodh ke sath shake karein."),
    ("Mass Gainer Protein Shake (Vanilla Cream)", "Mass Gainer Vanilla", "1 scoop (75g) in 350ml milk", 360, 25.0, 58, 4.5, "Workout ke 30-45 min baad", "High calorie post-workout supercompensation", "Doodh mein mix karke piyein."),
    ("Whey Protein + 30g Dextrose Recovery Shake", "Whey Protein + Dextrose Shake", "1 scoop whey + 30g dextrose", 235, 25.0, 32, 0.5, "Workout ke 20-30 min baad", "Spikes insulin for fastest muscle glycogen reload", "Shaker mein paani ke sath mix karein."),
    ("Whey Protein + 5g Creatine Monohydrate", "Whey Protein + Creatine", "1 scoop whey + 5g creatine", 120, 25.0, 2.0, 0.5, "Workout ke 20-30 min baad", "Rebuilds muscle fibers and replenishes cell stores", "Paani ke sath shaker mein shake karein."),
    ("L-Glutamine 5g Pure Recovery Powder", "L-Glutamine 5g Powder", "1 scoop (5g) in 200ml water", 0, 0, 0, 0, "Workout ke 20-30 min baad", "Reduces muscle soreness and speeds recovery", "Paani ya protein shake mein ghol kar piyein."),
    ("L-Glutamine 10g Advanced Recovery Dose", "L-Glutamine 10g Dose", "2 scoops (10g) in 300ml water", 0, 0, 0, 0, "Workout ke 20-30 min baad", "Intense leg day muscle repair and gut health", "Protein shake mein milakar piyein."),
    ("Creatine Monohydrate 5g Post-Workout", "Creatine Monohydrate 5g", "1 scoop (5g) in 250ml water", 0, 0, 0, 0, "Workout ke 20-30 min baad", "Maximizes phosphagen recovery after exhaustion", "Glucose paani ya fruit juice mein lein."),
    ("Creapure German Creatine 5g Post-Workout", "Creapure 5g Post-Workout", "1 scoop (5g) in 250ml water", 0, 0, 0, 0, "Workout ke 20-30 min baad", "Purest creatine for maximum strength recovery", "Shaker mein paani ke sath mix karein."),
    ("BCAA + Glutamine 2-in-1 Recovery Powder", "BCAA + Glutamine Mix", "1 scoop (10g) in 400ml water", 20, 8.0, 1.5, 0, "Workout ke 15-30 min baad", "Soreness reduction and muscle anti-catabolism", "Chilled water mein shake karein."),
    ("EAA Full Spectrum 9 Aminos Recovery", "EAA 9 Aminos Recovery", "1 scoop (10g) in 400ml water", 20, 7.5, 1.5, 0, "Workout ke 15-30 min baad", "Complete essential amino acid recovery drink", "Paani mein shake karke sip karein."),
    ("Micellar Casein Protein Shake (Night)", "Casein Protein Shake", "1 scoop (35g) in 300ml milk", 160, 26.0, 4.0, 1.5, "Workout ke 60-90 min baad", "Slow 8-hour amino release for night recovery", "Doodh mein shake karke piyein."),
    ("Whey Protein Bar (20g Protein, Chocolate)", "Whey Bar 20g Chocolate", "1 bar (60g)", 220, 20.0, 22.0, 7.0, "Workout ke 20-40 min baad", "Convenient on-the-go post-workout protein bite", "Wrapper khol kar chaba kar khayein."),
    ("Whey Protein Bar (20g Protein, Peanut)", "Whey Bar 20g Peanut", "1 bar (60g)", 230, 20.0, 21.0, 8.5, "Workout ke 20-40 min baad", "Delicious muscle replenishment bar", "Gym se nikalte hi consume karein."),
    ("Mega Protein Bar (30g Mega Protein)", "Mega Protein Bar 30g", "1 bar (85g)", 310, 30.0, 28.0, 9.0, "Workout ke 30-50 min baad", "Heavy lifters high protein recovery snack", "Chabakar paani ke sath lein."),
    ("Low Carb Keto Protein Bar (15g Protein)", "Low Carb Whey Bar", "1 bar (50g)", 175, 15.0, 12.0, 6.5, "Workout ke 20-30 min baad", "Zero added sugar clean recovery bar", "Direct consume karein."),
    ("Fast&Up Reload Recovery Fizz Tablet", "Fast&Up Recovery Fizz", "1 tablet in 500ml water", 12, 0, 3.0, 0, "Workout ke 10-20 min baad", "Rapid electrolyte rehydration after sweat", "Paani mein drop karein aur fizz hone par piyein."),
    ("ORS Rehydration Recovery Sachet", "ORS Recovery Sachet", "1 sachet in 250ml water", 45, 0, 11.0, 0, "Workout ke 15-25 min baad", "Clinical electrolyte and fluid balance", "Paani mein ghol kar piyein."),
    ("Dextrose Monohydrate 35g Glycogen Powder", "Dextrose 35g Powder", "35g in 350ml water", 135, 0, 34.0, 0, "Workout ke 15-25 min baad", "Fastest spike for empty muscle glycogen tanks", "Paani mein ghol kar piyein."),
    ("Maltodextrin 40g Recovery Carbs", "Maltodextrin 40g Powder", "40g in 400ml water", 155, 0, 39.0, 0, "Workout ke 20-30 min baad", "Sustained carbohydrate re-synthesis powder", "Protein shake mein mix karein."),
    ("RTD Whey Protein Shake (Chocolate 250ml)", "RTD Whey Shake 250ml", "1 bottle (250ml)", 160, 24.0, 10.0, 2.5, "Workout ke 15-30 min baad", "Chilled ready-to-drink portable protein", "Thanda shake karke direct piyein.")
]

BULKING_SUPP_BASE = [
    ("High Calorie Mass Gainer (Triple Chocolate)", "Mass Gainer Chocolate", "1 full serving (100g in 400ml milk)", 480, 32.0, 78.0, 5.5, "Meals ke beech mein ya post workout", "Dense hyper-caloric macronutrient matrix for rapid weight gain", "Shaker mein doodh ke sath achhe se shake karein."),
    ("High Calorie Mass Gainer (Gourmet Vanilla)", "Mass Gainer Vanilla", "1 full serving (100g in 400ml milk)", 480, 32.0, 78.0, 5.5, "Meals ke beech mein ya post workout", "Sustained high carb surplus with milk proteins", "Thande doodh mein shake karke piyein."),
    ("High Calorie Mass Gainer (Banana Cream)", "Mass Gainer Banana", "1 full serving (100g in 400ml milk)", 480, 32.0, 78.0, 5.5, "Subah ya sham ke waqt", "Smooth fruit flavored mass building fuel", "Mixer ya shaker mein blend karein."),
    ("High Calorie Mass Gainer (Cookies & Cream)", "Mass Gainer Cookies Cream", "1 full serving (100g in 400ml milk)", 480, 32.0, 78.0, 5.5, "Post workout calorie booster", "Delicious dessert surplus drink for hardgainers", "Shaker bottle mein shake karein."),
    ("High Calorie Mass Gainer (Alphonso Mango)", "Mass Gainer Mango", "1 full serving (100g in 400ml milk)", 480, 32.0, 78.0, 5.5, "Evening surplus meal", "Refreshing mango high calorie shake", "Chilled milk mein mix karein."),
    ("Mega Mass Weight Gainer (Rich Chocolate)", "Mega Mass Gainer", "1 scoop (75g in 350ml milk)", 390, 26.0, 62.0, 4.0, "Morning breakfast addition", "Quality carbohydrate polymers and whey concentrate", "Doodh mein mix karke piyein."),
    ("Mega Mass Weight Gainer (Strawberry Swirl)", "Mega Mass Strawberry", "1 scoop (75g in 350ml milk)", 390, 26.0, 62.0, 4.0, "Post workout mass reload", "Berry flavored high calorie shake", "Shaker mein mix karein."),
    ("Pure Maltodextrin Carbohydrate Powder (50g)", "Maltodextrin 50g Powder", "50g in 400ml water", 190, 0, 48.0, 0, "Intra ya post workout", "Zero fat hyper-caloric pure complex starch", "Protein shake ya paani mein gholein."),
    ("Pure Maltodextrin Carbohydrate Powder (75g)", "Maltodextrin 75g Powder", "75g in 500ml water", 285, 0, 72.0, 0, "Daily caloric booster", "Rapid gastric emptying calorie density", "Shaker mein kisi bhi drink mein milayein."),
    ("Pure Dextrose Rapid Glucose Powder (50g)", "Dextrose 50g Powder", "50g in 400ml water", 190, 0, 48.0, 0, "Immediate post workout", "Fast glycogen supercompensation carbs", "Protein shake mein milakar piyein."),
    ("Cluster Dextrin Highly Branched Carbs (50g)", "Cluster Dextrin 50g", "50g in 500ml water", 190, 0, 48.0, 0, "Sustained high volume fuel", "Zero bloating premium carbohydrate fuel", "Paani mein mix karke piyein."),
    ("Instantized Whole Oat Powder (60g)", "Instant Oat Powder 60g", "60g in 350ml milk", 240, 8.5, 42.0, 4.5, "Clean food mass shake", "Whole grain complex starches and soluble fiber", "Doodh ya shake mein blend karein."),
    ("MCT Oil Pure Liquid (Medium Chain Lipids 15ml)", "MCT Oil Liquid 15ml", "1 tablespoon (15ml)", 130, 0, 0, 14.0, "Coffee ya smoothie mein", "Calorically dense lipid formulation for clean surplus", "Shake ya black coffee mein mix karein."),
    ("MCT Oil Pure Liquid (Medium Chain Lipids 30ml)", "MCT Oil Liquid 30ml", "2 tablespoons (30ml)", 260, 0, 0, 28.0, "Heavy bulk lipid booster", "High energy fast burning metabolic fats", "Protein shake mein daalein."),
    ("High Calorie Mass Protein Bar (400 kcal Chocolate)", "Mass Protein Bar 400 kcal", "1 large bar (100g)", 410, 30.0, 46.0, 12.0, "On the go 400 calorie meal", "Dense macronutrient matrix for hardgainers", "Wrapper khol kar direct khayein."),
    ("High Calorie Peanut Butter Oats Bar (350 kcal)", "PB Oats Mass Bar", "1 large bar (90g)", 360, 24.0, 42.0, 13.0, "Travel friendly bulk snack", "Whole rolled oats with roasted peanut butter", "Chabakar doodh ya paani ke sath lein."),
    ("Creatine Monohydrate 5g Daily Mass Protocol", "Creatine 5g Mass Dose", "1 scoop (5g) in 250ml juice", 0, 0, 0, 0, "Rozana subah ya post workout", "Intracellular water retention and power output", "Fruit juice ya shake mein ghol kar lein."),
    ("Creapure German Micronized Creatine 5g", "Creapure 5g Mass Protocol", "1 scoop (5g) in 250ml juice", 0, 0, 0, 0, "Daily mass phase staple", "Purest German creatine for maximal size and strength", "Shaker mein shake karke piyein."),
    ("Whey Protein Blend with 50g Carbs Mass Shake", "Whey + 50g Carbs Shake", "1 scoop whey + 50g carbs", 310, 25.0, 52.0, 1.5, "Post workout surplus shake", "Complete protein with hyper-caloric carb spike", "Thande paani ya doodh mein banayein."),
    ("Micellar Casein High Calorie Night Shake", "Casein Mass Night Shake", "1 scoop (35g in 350ml whole milk)", 260, 31.0, 18.0, 7.5, "Raat ko sone se pehle", "Slow release 8-hour amino surplus protection", "Full cream doodh mein shake karein."),
    ("Omega-3 Triple Strength Fish Oil (2 Softgels)", "Triple Strength Fish Oil", "2 softgels (2000mg)", 20, 0, 0, 2.0, "Meal ke sath", "Joint lubrication and anti-inflammatory healthy fats", "Paani ke sath nigal lein."),
    ("Flaxseed Oil Cold Pressed Softgels (2 Softgels)", "Flaxseed Oil Softgels", "2 softgels (2000mg)", 20, 0, 0, 2.0, "Daily essential lipids", "Vegetarian ALA omega-3 lipid support", "Lunch ya dinner ke sath lein."),
    ("L-Glutamine 10g Cell Volumizing Powder", "L-Glutamine 10g Powder", "2 scoops (10g) in 300ml water", 0, 0, 0, 0, "Post workout ya bedtime", "Intracellular hydration and recovery in surplus", "Protein shake mein mix karein."),
    ("Ready to Drink High Calorie Mass Shake (330ml)", "RTD Mass Shake 330ml", "1 bottle (330ml)", 320, 25.0, 42.0, 6.0, "Instant portable meal", "Creamy ready-to-drink mass surplus bottle", "Chilled bottle direct shake karke piyein."),
    ("Mass Gainer Extreme Calorie Shake (Chocolate Fudge)", "Extreme Mass Gainer", "1 full serving (120g in 400ml milk)", 540, 36.0, 88.0, 6.0, "Meals ke beech mein", "Ultra-high calorie dense lipid and carbohydrate matrix", "Doodh ke sath shake karke piyein."),
    ("Hydrolyzed Beef Protein Isolate Mass Shake", "Beef Protein Mass Shake", "1 scoop (35g in 300ml milk)", 220, 30.0, 12.0, 3.5, "Post workout ya subah", "Dairy-free high collagen and amino acid mass fuel", "Thande doodh mein shake karein."),
    ("Digestive Enzymes Complex for Mass Bulking", "Mass Digestion Enzymes", "2 capsules with heavy meals", 0, 0, 0, 0, "Heavy surplus meal ke sath", "Maximizes nutrient assimilation from high calorie meals", "Paani ke sath consume karein.")
]

print("Supplements base ready with bulking base")

