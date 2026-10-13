"""
Muscle Endurance Database Base Definitions
70% Indian Home Foods (525 items: 35 base dishes x 15 accompaniments)
30% Gym Supplements (225 items: 15 base supplements x 15 serving modes)
Total: 750 items
Focus: Hydrogen ion buffering, lactic acid delay, electrolyte balance, sustained muscle contractions.
"""

MUSCLE_ENDURANCE_HOME_BASE = [
    # 1. Alkalizing Greens & Lactic Acid Buffers (Palak, Methi, Mint)
    (
        "Warm Palak (Spinach) & Garlic Clear Broth",
        "Palak Lehsun Garam Soup",
        "1 big bowl (250ml)",
        65, 3.5, 8.0, 1.2,
        "Workout se 45 min pehle",
        "Rich in dietary nitrates, potassium and magnesium to buffer muscular lactic acid",
        "Taaza palak aur lehsun ko halka ubaal kar blend karein aur gunguna piyein."
    ),
    (
        "Homestyle Dal Palak (Yellow Moong Dal with Spinach)",
        "Ghar ki Dal Palak",
        "1 deep bowl (200g)",
        165, 10.5, 24.0, 2.5,
        "Workout se 90-120 min pehle",
        "Provides alkalizing plant minerals and clean amino acids for high-rep stamina",
        "Dhuli moong dal mein barik kata palak aur jeera ka tadka lagakar pakayein."
    ),
    (
        "Fresh Methi (Fenugreek) Thepla with Green Coriander Chutney",
        "Methi Thepla Dhaniya Chutney",
        "2 theplas (120g)",
        190, 6.5, 32.0, 4.0,
        "Pre-workout 75 min pehle",
        "Slow-burning whole grain starch paired with chlorophyll-rich fenugreek greens",
        "Gehu ke aate mein taaza methi, ajwain aur halka dahi gundh kar tawa par sekhein."
    ),
    (
        "Chilled Pudina (Mint) & Jeera Spiced Buttermilk",
        "Pudina Jeera Thandi Chaas",
        "1 tall glass (300ml)",
        60, 4.2, 7.0, 1.5,
        "Workout ke dauran ya 30 min pehle",
        "Bioactive sodium, potassium and lactic-clearing electrolytes prevent muscle cramping",
        "Ghar ki dahi mein thanda paani, taaza pudina aur bhuna jeera churn karein."
    ),
    (
        "Cucumber & Coriander Alkalizing Muscle Hydration Juice",
        "Kheera Dhaniya Alkalizing Juice",
        "1 large glass (250ml)",
        45, 1.8, 8.5, 0.4,
        "Workout se 30 min pehle",
        "Restores systemic pH balance and delays muscular acidosis during high-rep sets",
        "Taaza kheera, hara dhaniya aur nimbu ka ras blender mein blend karke chhaanein."
    ),

    # 2. Carnosine Rich Proteins & Amino Substrates (Natural Beta-Alanine)
    (
        "Shredded Boiled Chicken Breast with Fresh Lime & Mint",
        "Shredded Chicken Breast Nimbu Pudina",
        "1 bowl (150g)",
        185, 40.0, 1.0, 2.2,
        "Workout se 2 ghante pehle ya post workout",
        "Natural carnosine and anserine peptides that buffer intracellular hydrogen ions",
        "Chicken breast ko ubaal kar reshe karein, taaza nimbu aur pudina milayein."
    ),
    (
        "Tawa Grilled Rohu Fish Fillet with Ajwain & Lemon",
        "Tawa Machhli Tikka Ajwain Nimbu",
        "150g fish fillet",
        175, 29.0, 2.0, 4.5,
        "Workout se 2 ghante pehle",
        "High histidine and carnosine content enhances buffering of high-volume muscle fatigue",
        "Rohu machhli ko ajwain, haldi aur nimbu mein marinate karke tawa par sekein."
    ),
    (
        "Light Paneer Bhurji with Diced Bell Peppers & Onions",
        "Halki Paneer Bhurji Shimla Mirch ke Sath",
        "1 bowl (150g)",
        210, 18.0, 8.0, 12.0,
        "Workout se 90 min pehle",
        "Slow-clearing casein amino acids coupled with vitamin C for prolonged contractions",
        "Low-fat paneer ko shimla mirch, tamatar aur jeera ke sath tawa par sauté karein."
    ),
    (
        "Boiled Whole Eggs & Whites (2 Whole + 2 Whites)",
        "Uble Hue Ande (2 Pure + 2 Safedi)",
        "4 eggs (2 whole + 2 whites)",
        205, 22.0, 1.5, 11.0,
        "Workout se 60-90 min pehle",
        "Complete bioavailable albumin protein supporting repeated muscle fiber recruitment",
        "Ando ko 10 min ubaal kar chheel lein, sendha namak ke sath lein."
    ),
    (
        "Soya Chunks Stir Fry with Crunchy Capsicum & Jeera",
        "Soya Chunks Shimla Mirch Stir Fry",
        "1 bowl (150g)",
        195, 24.0, 14.0, 3.5,
        "Workout se 90 min pehle",
        "High BCAA concentration and glutamic acid to defend against muscle breakdown",
        "Soya chunks ko gungune paani mein bhigo kar nichodein aur shimla mirch ke sath sauté karein."
    ),

    # 3. Mineral Dense Seeds & Electrolyte Fuel (Pumpkin, Rajgira, Sesame)
    (
        "Roasted Pumpkin Seeds (Kaddu ke Beej) with Sendha Namak",
        "Bhune Kaddu ke Beej Sendha Namak",
        "1 small bowl (35g)",
        190, 10.0, 5.0, 15.0,
        "Pre-workout munching 45 min pehle",
        "Dense magnesium and zinc optimize neuromuscular transmission and prevent early burn",
        "Kaddu ke beej ko tawa par dry roast karein aur halka sendha namak milayein."
    ),
    (
        "Rajgira (Amaranth) Porridge with Cow Milk & Almonds",
        "Rajgira Kheer Gaay ke Doodh aur Badaam ke Sath",
        "1 bowl (200g)",
        215, 8.5, 34.0, 5.0,
        "Pre-workout 75 min pehle",
        "Rich in bioavailable calcium, squalene and sustained-release complex carbohydrates",
        "Rajgira ke beej ko doodh mein pakayein aur barik kate badaam dalein."
    ),
    (
        "Sprouted Moong & Kala Chana Chaat with Raw Mango Slices",
        "Ankurit Moong Chana Chaat Kairi ke Sath",
        "1 bowl (160g)",
        160, 9.5, 26.0, 2.0,
        "Pre-workout 60 min pehle",
        "Natural organic acids and enzymes accelerate lactic acid recycling via Krebs cycle",
        "Ankurit moong aur chane mein kacchi kairi, tamatar aur nimbu mix karein."
    ),
    (
        "Desi Sattu & Roasted Jeera Drink (Alkalizing Saline Mix)",
        "Sattu Bhuna Jeera Namkeen Drink",
        "1 tall glass (300ml)",
        180, 11.0, 27.0, 2.5,
        "Workout se 45 min pehle",
        "Dense plant protein paired with sodium and potassium to delay high-set muscle fatigue",
        "Sattu ko thande paani, bhuna jeera aur sendha namak ke sath shake karein."
    ),
    (
        "Boiled Sweet Potato (Shakarkandi) Slices with Lemon & Cumin",
        "Ubli Shakarkandi Nimbu Bhuna Jeera",
        "1 medium bowl (180g)",
        155, 2.6, 36.0, 0.3,
        "Workout se 60 min pehle",
        "High potassium content buffers muscle acidity and provides steady glycogen flow",
        "Shakarkandi ubaal kar kaatein, sends namak aur taza nimbu dalein."
    ),

    # 4. Sustained Glycogen Grains & Endurance Starches
    (
        "Brown Rice & Yellow Moong Khichdi with Mild Cumin Tadka",
        "Brown Rice Moong Dal Khichdi Jeera Tadka",
        "1 deep bowl (220g)",
        220, 8.0, 42.0, 2.8,
        "Workout se 2 ghante pehle",
        "Low-glycemic steady starch that delays glycogen depletion during 20+ set workouts",
        "Brown rice aur dhuli moong dal ko cooker mein haldi aur jeera ke sath banayein."
    ),
    (
        "Steamed Brown Rice Poha with Peanuts & Mustard Seeds",
        "Brown Rice Poha Moongphali Sarson Tadka",
        "1 plate (150g)",
        210, 5.5, 38.0, 4.5,
        "Breakfast ya 90 min pre-workout",
        "Iron and thiamine rich complex carbs to support prolonged muscular oxidative drive",
        "Brown poha ko bhigo kar sarson, moongphali aur kadi patta ke sath banayein."
    ),
    (
        "Broken Wheat Daliya with Carrots & Green Beans",
        "Dalia Sabziyon ke Sath (Gajar Beans)",
        "1 bowl (200g)",
        185, 6.0, 36.0, 2.2,
        "Workout se 90 min pehle",
        "High insoluble fiber and complex starch ensures steady glucose output under fatigue",
        "Gehu ka dalia gajar, beans aur jeera ke sath cooker mein paka lein."
    ),
    (
        "Besan & Vegetable Chilla with Fresh Mint Chutney",
        "Besan Sabzi Chilla Pudina Chutney",
        "2 medium chillas (140g)",
        195, 10.0, 26.0, 5.0,
        "Workout se 75 min pehle",
        "Sustained-release chickpea flour matrix with high potassium to prevent muscle twitches",
        "Besan mein pyaz, tamatar aur dhaniya ghol kar tawa par patla sekhein."
    ),
    (
        "Whole Wheat Phulka (2 Rotis) with Steamed Moong Dal",
        "2 Gehu Phulka Taza Moong Dal ke Sath",
        "2 rotis + 1 bowl dal",
        230, 9.5, 44.0, 2.5,
        "Workout se 2 ghante pehle",
        "Classic Indian clean endurance staple, light on gut with continuous amino delivery",
        "Taaza phulke paka kar patli moong dal ke sath lein."
    ),

    # 5. Natural Hydration, Potassium & Nitrates
    (
        "Taaza Nariyal Paani (Tender Coconut Water) with Malai",
        "Fresh Malabar Coconut Water with Malai",
        "1 whole coconut (300ml)",
        75, 1.8, 13.0, 1.5,
        "Pre ya intra workout",
        "Natural isotonic balance of potassium, magnesium and sodium for muscular pumps",
        "Taaza nariyal tod kar paani aur halki malai turant piyein."
    ),
    (
        "Fresh Beetroot & Apple Cold Pressed Juice",
        "Taza Chukandar Seb Juice",
        "1 glass (250ml)",
        110, 1.8, 26.0, 0.3,
        "Workout se 60-90 min pehle",
        "Nitric oxide elevation opens muscular capillaries, reducing metabolic fatigue",
        "Chukandar aur seb ko juice nikaal kar taaza piyein."
    ),
    (
        "Natural Kokum Sharbat with Cumin & Rock Salt",
        "Taaza Kokum Sharbat Jeera Sendha Namak",
        "1 large glass (250ml)",
        65, 0.5, 16.0, 0.2,
        "Workout se 30 min pehle ya beech mein",
        "Hydroxyl citric acid and cooling antioxidants soothe active muscles and buffer heat",
        "Kokum pulp ko thande paani, bhuna jeera aur sendha namak ke sath mix karein."
    ),
    (
        "Fresh Watermelon & Mint Muscle Hydrator Bowl",
        "Taaza Tarbooz Pudina Bowl",
        "1 large bowl (250g)",
        80, 1.5, 19.0, 0.4,
        "Workout se 40 min pehle",
        "Natural L-citrulline clears exercise ammonia, prolonging high-intensity sets",
        "Tarbooz kaat kar upar se taaza pudina ke patte daal kar khayein."
    ),
    (
        "Ripe Robusta Banana with Natural Peanut Butter (1 Spoon)",
        "Paka Kela Peanut Butter ke Sath",
        "1 banana + 1 tbsp peanut butter",
        205, 5.5, 32.0, 8.0,
        "Workout se 30-45 min pehle",
        "Instant and sustained carbohydrate delivery paired with high muscle potassium",
        "Kela kaat kar uspar natural peanut butter lagayein aur khayein."
    ),

    # 6. Traditional Indian Stamina & Buffering Preparations
    (
        "Soaked Black Raisins (Kishmish) & Munakka Water",
        "Bheegi Kaali Kishmish Munakka Paani",
        "1 bowl (20 pieces + water)",
        90, 1.4, 22.0, 0.2,
        "Subah uthte hi khali pet",
        "Purifies blood and optimizes red blood cell oxygen carrying capacity",
        "Raat ko saaf paani mein bhigo kar subah paani sahit lein."
    ),
    (
        "Desi Cow Milk with Ashwagandha & Pure Honey",
        "Gaay ka Doodh Ashwagandha Shehad ke Sath",
        "1 big cup (250ml)",
        175, 7.5, 18.0, 6.0,
        "Raat ko sone se pehle",
        "Balances cortisol and enhances cardiorespiratory muscle endurance",
        "Garam doodh mein 1/2 chammach ashwagandha aur shehad gholein."
    ),
    (
        "Steamed Idlis with Fresh Coconut Chutney (3 Idlis)",
        "Ghar ki Bhaap Idli Nariyal Chutney (3 Idli)",
        "3 idlis + chutney (180g)",
        200, 6.5, 38.0, 3.5,
        "Workout se 75 min pehle",
        "Fermented light carbohydrate matrix that empties from stomach with zero heaviness",
        "Chawal aur urad dal ke batter ko bhaap mein paka kar taaza lein."
    ),
    (
        "Roasted Fox Nuts (Makhana) with Light Sendha Namak & Ghee",
        "Bhuna Makhana Desi Ghee Sendha Namak",
        "1 big bowl (40g)",
        140, 3.6, 25.0, 2.8,
        "Pre-workout light snack",
        "Low glycemic complex carbohydrates that prevent mid-workout muscle weakness",
        "Halke desi ghee mein makhana bhun kar sendha namak milayein."
    ),
    (
        "Warm Moong Dal Soup with Black Pepper & Cumin",
        "Moong Dal Patla Soup Kali Mirch Jeera",
        "1 big bowl (220ml)",
        110, 7.0, 18.0, 1.2,
        "Workout se 60 min pehle",
        "Alkalizing legume broth easily assimilated during intensive high-volume training",
        "Peeli moong dal ko patla ubaal kar jeera aur halki kali mirch ke sath lein."
    ),
    (
        "Til (Sesame) & Peanut Chikki Bar (1 Piece)",
        "Til Moongphali Gur Chikki (1 Piece)",
        "1 bar (40g)",
        180, 4.8, 22.0, 8.5,
        "Workout se 40 min pehle",
        "High calcium and iron density for sustained repetitive muscular contractions",
        "Bhune til, moongphali aur desi gur ki chikki ka ek piece lein."
    ),
    (
        "Boiled Sweet Corn with Lemon & Roasted Jeera",
        "Ubla Sweet Corn Nimbu Bhuna Jeera",
        "1 bowl (140g)",
        135, 4.0, 28.0, 1.8,
        "Workout se 60 min pehle",
        "Medium-chain complex starches deliver constant glycogen during 2-hour workouts",
        "Sweet corn ko ubaal kar taaza nimbu aur bhuna jeera milayein."
    ),
    (
        "Fresh Orange (Santra) Slices with Rock Salt",
        "Taaza Santra Sendha Namak ke Sath",
        "2 medium oranges (200g)",
        95, 1.8, 23.0, 0.3,
        "Workout se 30 min pehle",
        "Citrus bioflavonoids and potassium protect muscle membranes against oxidative fatigue",
        "Santra chheel kar fankein alag karein aur halka sendha namak lagayein."
    ),
    (
        "Soaked Royal Figs (Anjeer) with Walnuts (Akhrot)",
        "Bheega Anjeer aur Akhrot Snack",
        "2 figs + 4 walnut halves",
        150, 3.2, 20.0, 7.5,
        "Subah workout se 45 min pehle",
        "Omega-3 fatty acids and iron enhance muscle fiber elasticity and oxygen supply",
        "Raat bhar bheege anjeer aur akhrot ko subah chaba kar khayein."
    ),
    (
        "Fresh Amla & Mint Immunity Endurance Cooler",
        "Taaza Amla Pudina Cooler",
        "1 glass (250ml)",
        40, 0.8, 9.0, 0.1,
        "Workout se 30 min pehle",
        "Massive vitamin C load prevents capillary damage and reduces perceived exertion",
        "Do taaza amla aur pudina blend karein, thande paani mein ghol kar lein."
    )
]

# 15 Authentic Accompaniments for 35 Dishes = 35 * 15 = 525 Home Items
MUSCLE_ENDURANCE_HOME_MODS = [
    ("(Standard Muscle Endurance Portion)", "(Standard Endurance Portion)", 1.0, "Standard endurance calibrated portion."),
    ("(High-Volume Repetition Double Portion)", "(Double Endurance Portion)", 1.45, "Maximized glycogen portion for high-volume 20-rep training."),
    ("(Clean Fiber Light Serving)", "(Clean Light Serving)", 1.12, "Calibrated light endurance serving."),
    ("with 1 Glass Chilled Chaas", "1 Glass Thandi Chaas ke Sath", 1.15, "Added bioactive sodium and potassium to buffer lactic acid accumulation."),
    ("with Fresh Mint & Coriander Chutney", "Pudina Dhaniya Chutney ke Sath", 1.03, "Chlorophyll and herbal enzymes promoting rapid cellular clearing."),
    ("with 1 Spoon Desi Cow Ghee", "1 Chammach Desi Gaay ke Ghee ke Sath", 1.25, "Slow-burning natural lipids for extended muscular exertion."),
    ("with Fresh Homemade Curd", "Ghar ki Taaza Dahi ke Sath", 1.18, "Probiotic calcium and slow-release casein amino acids."),
    ("with Handful of Roasted Pumpkin Seeds", "Bhune Kaddu ke Beej ke Sath", 1.28, "Dense magnesium prevents neuromuscular fatigue and muscle twitches."),
    ("with Squeeze of Fresh Lemon", "Taaza Nimbu ke Sath", 1.01, "Citric acid cycle optimizer speeding up lactic clearance."),
    ("with 1 Spoon Pure Honey", "1 Chammach Taaza Shehad ke Sath", 1.16, "Immediate muscle glycogen boost delaying mid-workout burnout."),
    ("with Roasted Chia Seeds", "Bhune Chia Beej ke Sath", 1.08, "Hydrophilic seeds optimizing intra-muscular fluid balance."),
    ("with Sliced Cucumber & Tomato", "Kheera Tamatar Salad ke Sath", 1.04, "Water-dense alkalizing minerals for sustained muscular sets."),
    ("with 1 Cup Warm Green Tea", "1 Cup Garam Green Tea ke Sath", 1.02, "EGCG catechins reducing oxidative muscular inflammation."),
    ("with 2 Medjool Dates", "2 Taaza Khajoor ke Sath", 1.22, "Fast-acting carbohydrate spikes powering high-intensity drop sets."),
    ("with 1 Glass Coconut Water", "1 Glass Nariyal Paani ke Sath", 1.14, "Natural potassium recharge buffering lactic muscle burn.")
]

MUSCLE_ENDURANCE_SUPPS_BASE = [
    (
        "Sodium Bicarbonate Buffered Endurance Capsules (1500mg)",
        "Sodium Bicarbonate Lactic Buffer Capsule",
        "2 capsules with 300ml water",
        5, 0.0, 1.0, 0.0,
        "High-volume workout se 60 min pehle",
        "Directly neutralizes hydrogen ion buildup in bloodstream, delaying muscular burn",
        "Paani ke sath nigalein. Heavy high-rep sets aur drop-sets ke liye best buffer."
    ),
    (
        "Beta-Alanine Ultra-Pure CarnoSyn (3200mg)",
        "Beta-Alanine Muscle Endurance Powder",
        "1 scoop (3.2g) in 250ml water",
        15, 3.2, 0.0, 0.0,
        "Workout se 20-30 min pehle",
        "Maximizes intramuscular carnosine levels to buffer acid and extend rep capacity",
        "Thande paani mein shake karke workout se aadha ghanta pehle piyein."
    ),
    (
        "Fermented L-Citrulline Malate 2:1 (6000mg)",
        "Citrulline Malate Ammonia Buffer Powder",
        "1 scoop (6g) in 300ml water",
        15, 0.0, 3.5, 0.0,
        "Workout se 30-45 min pehle",
        "Clears muscle ammonia and boosts nitric oxide for high-rep pump stamina",
        "Paani ya pre-workout drink mein gholein aur training se pehle lein."
    ),
    (
        "Taurine Pharmaceutical Grade (2000mg)",
        "Taurine Cellular Hydration Powder",
        "1 scoop (2g) in 250ml water",
        10, 2.0, 0.0, 0.0,
        "Workout se 30 min pehle ya intra-workout",
        "Regulates calcium handling in muscle fibers, preventing painful cramping and fatigue",
        "Shaker mein paani ke sath milayein aur piyein."
    ),
    (
        "Electrolyte Stamina Matrix (Sodium, Potassium, Magnesium, Zinc)",
        "Electrolyte Lactic Defense Hydration",
        "1 sachet (10g) in 500ml water",
        30, 0.0, 7.5, 0.0,
        "Intra-workout running & high-set training",
        "Maintains cellular osmotic equilibrium, buffering metabolic acids during 20+ sets",
        "500ml shaker mein gholein aur training ke dauran ghut-ghut piyein."
    ),
    (
        "Peak ATP (Adenosine 5'-Triphosphate Disodium 400mg)",
        "Peak ATP Cellular Energy Capsule",
        "1 veg capsule",
        4, 0.0, 1.0, 0.0,
        "Workout se 30 min pehle",
        "Increases muscular excitability, total training volume and repetitions to failure",
        "Paani ke sath lein khali pet workout se aadha ghanta pehle."
    ),
    (
        "High-Molecular Karbolyn Performance Endurance Powder (25g)",
        "Karbolyn Rapid-Pass Muscle Fuel",
        "1 scoop (25g) in 400ml water",
        100, 0.0, 25.0, 0.0,
        "Intra-workout sip by sip",
        "Rapid gastric emptying provides continuous glucose without stomach heaviness",
        "Intra-workout drink mein shake karein aur workout ke dauran lein."
    ),
    (
        "Intra-Workout BCAA + L-Glutamine Fermented (7g)",
        "BCAA Glutamine Muscle Recovery Drink",
        "1 scoop (10g) in 350ml water",
        30, 7.0, 0.5, 0.0,
        "Intra-workout ya heavy sets ke beech",
        "Inhibits muscle protein catabolism and speeds up inter-set recovery",
        "Thande paani mein ghol kar training sets ke beech mein sip karein."
    ),
    (
        "Micronized Creatine Monohydrate with Pink Salt (5g)",
        "Creatine Monohydrate Cellular Buffer",
        "1 scoop (5g) in 300ml water",
        20, 5.0, 0.0, 0.0,
        "Pre ya post workout daily",
        "Replenishes phosphocreatine stores for continuous high-wattage muscular power",
        "Paani ya fruit juice ke sath achi tarah ghol kar consume karein."
    ),
    (
        "Red Beetroot Nitrate Extract (RedNite 600mg)",
        "Beetroot Extract Oxygen Pump Powder",
        "1 scoop (5g) in 300ml water",
        20, 0.5, 4.5, 0.0,
        "Workout se 60 min pehle",
        "Increases blood oxygen saturation, allowing muscles to sustain more reps under fatigue",
        "Thande paani mein mix karke workout se 1 ghanta pehle lein."
    ),
    (
        "Tart Cherry Extract High Antioxidant (1200mg)",
        "Tart Cherry Muscle Soreness Shield",
        "2 capsules",
        10, 0.2, 2.2, 0.0,
        "Post-workout ya workout se 1 ghanta pehle",
        "Anthocyanins dramatically lower lipid peroxidation and muscular soreness",
        "Paani ke sath do capsules lein for fast muscle recovery."
    ),
    (
        "Calcium Pyruvate & Potassium Pyruvate (1500mg)",
        "Pyruvate Krebs Cycle Energy Capsule",
        "2 veg capsules",
        6, 0.0, 1.5, 0.0,
        "Workout se 45 min pehle",
        "Facilitates glucose transport into muscle cells, boosting aerobic endurance capacity",
        "Paani ke sath lein pre-workout."
    ),
    (
        "L-Glutamine 100% Kyowa Quality Powder (5g)",
        "L-Glutamine Muscle Ammonia Buffer",
        "1 scoop (5g) in 250ml water",
        20, 5.0, 0.0, 0.0,
        "Post workout ya intra-workout",
        "Scavenges excess ammonia and accelerates glycogen resynthesis in exhausted fibers",
        "Workout ke turant baad paani mein mix karke piyein."
    ),
    (
        "Rhodiola Rosea & Schisandra Adaptogen (500mg)",
        "Rhodiola Schisandra Anti-Fatigue Capsule",
        "1 capsule",
        4, 0.2, 0.7, 0.0,
        "Subah breakfast ke sath ya pre-workout",
        "Lowers sympathetic stress and maintains muscle contraction force during high volume",
        "Paani ke sath lein for deep mental and muscular resilience."
    ),
    (
        "Marine Magnesium & Coral Calcium Buffer (400mg)",
        "Marine Magnesium Intracellular Buffer",
        "1 scoop (3g) in 200ml water",
        5, 0.0, 1.0, 0.0,
        "Workout se 45 min pehle ya raat ko",
        "Alkalizing ionic minerals that maintain muscle relaxation-contraction coupling",
        "Gungune ya sadharan paani mein ghol kar piyein."
    )
]

# 15 Serving Modes for 15 Supplements = 15 * 15 = 225 Supplement Items
MUSCLE_ENDURANCE_SUPP_MODS = [
    ("in Chilled Water", "Thande Paani mein", 1.0, "Standard chilled water dilution."),
    ("in Fresh Coconut Water", "Taaza Nariyal Paani mein", 1.35, "Electrolyte-rich coconut water suspension for hyper-endurance."),
    ("with Squeeze of Fresh Lemon", "Taaza Nimbu ke Sath", 1.02, "Citrus bioflavonoid activation matrix."),
    ("in Room Temperature Water", "Sadharan Paani mein", 1.0, "Rapid absorption room temperature hydration."),
    ("with 1 Spoon Pure Honey", "1 Chammach Shehad ke Sath", 1.25, "Dual carbohydrate fuel for rapid intra-set glycogen."),
    ("with Pinch of Pink Himalayan Salt", "Sendha Namak ke Sath", 1.01, "Optimized sodium balance preventing intra-set cramping."),
    ("in Mint Infused Iced Water", "Pudina Baraf Paani mein", 1.02, "Cooling menthol endurance hydration."),
    ("in Fresh Mosambi Juice", "Mosambi Juice mein", 1.45, "Citrus fructose delivery speeding up gastric emptying."),
    ("with Chia Seed Gel Infusion", "Chia Seed Paani ke Sath", 1.15, "Sustained hydration suspension."),
    ("in Warm Water", "Gungune Paani mein", 1.0, "Rapid gastric dissipation in warm water."),
    ("in Low-Fat Skimmed Milk", "Skimmed Doodh mein", 1.4, "Slow-absorbing casein peptide matrix."),
    ("with Submerged Ice Cubes", "Baraf ke Tukdon ke Sath", 1.0, "Cold thermoregulatory performance drink."),
    ("with 1 Spoon Organic Jaggery Powder", "Desi Gur ke Sath", 1.25, "Iron-enriched unrefined sucrose endurance push."),
    ("in Fresh Orange Juice", "Taaza Santre ke Ras mein", 1.42, "Potassium and natural bioflavonoid synergy."),
    ("with Coconut Water & Chia Seeds", "Nariyal Paani aur Chia Beej ke Sath", 1.48, "Ultimate marathon-grade cellular endurance suspension.")
]
