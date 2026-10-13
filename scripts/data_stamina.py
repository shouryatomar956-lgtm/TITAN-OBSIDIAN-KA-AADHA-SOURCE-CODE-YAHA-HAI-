"""
Stamina Building Database Base Definitions
70% Indian Home Foods (525 items: 35 base dishes x 15 accompaniments)
30% Gym Supplements (225 items: 15 base supplements x 15 serving modes)
Total: 750 items
Focus: Mitochondrial oxidative capacity, cellular oxygen efficiency, endurance substrates.
"""

STAMINA_HOME_BASE = [
    # 1. Beetroot & Nitrates
    (
        "Fresh Beetroot & Carrot Juice with Mint",
        "Taza Chukandar Gajar Juice Pudina",
        "1 glass (250ml)",
        95, 2.0, 22.0, 0.3,
        "Subah khali pet ya workout se 90 min pehle",
        "Dietary nitrates boost blood flow, oxygen transport and endurance",
        "Chukandar, gajar aur pudina ka taza ras nikalein."
    ),
    (
        "Steamed Beetroot Slices with Lemon & Roasted Cumin",
        "Ubla Chukandar Nimbu Bhuna Jeera",
        "1 bowl (150g)",
        65, 1.8, 14.5, 0.2,
        "Pre-workout ya salad ke roop mein",
        "Increases cellular nitric oxide and improves exercise tolerance",
        "Chukandar ko ubaal kar slices banayein aur nimbu nichodein."
    ),
    (
        "Beetroot & Pomegranate Stamina Smoothie",
        "Chukandar Anaar Stamina Smoothie",
        "1 tall glass (300ml)",
        140, 3.2, 32.0, 0.5,
        "Workout se 60-75 min pehle",
        "Synergistic polyphenol and nitrate blast for sustained oxygen delivery",
        "Chukandar aur anaar ke daano ko dahi ya paani ke sath blend karein."
    ),

    # 2. Sattu & Desi Chana (Legendary Indian wrestler stamina fuel)
    (
        "Desi Roasted Chana Sattu Sharbat (Namkeen)",
        "Bihari Bhuna Chana Sattu Sharbat (Namkeen)",
        "1 large glass (300ml)",
        195, 11.5, 30.0, 3.0,
        "Workout se 45 min pehle ya subah",
        "Slow-digesting complex carbs and plant protein for 2-hour workout stamina",
        "3 chammach sattu thande paani, bhuna jeera aur nimbu mein gholein."
    ),
    (
        "Sweet Sattu Energy Drink with Desi Jaggery",
        "Meetha Sattu Sharbat Desi Gur ke Sath",
        "1 large glass (300ml)",
        230, 10.5, 42.0, 2.5,
        "Morning endurance fuel ya long workout",
        "Natural glucose and high-fiber sustained energy without energy crashes",
        "Sattu aur pisa hua gur paani mein ache se mix karein."
    ),
    (
        "Boiled Desi Kala Chana Chaat with Lemon & Coriander",
        "Ubla Kala Chana Chaat Nimbu Dhaniya",
        "1 medium bowl (150g)",
        180, 10.0, 28.0, 3.0,
        "Workout se 1-2 ghante pehle",
        "High bioavailable iron and zinc to prevent workout fatigue and boost stamina",
        "Raat bhar bheege chane ubaal kar tamatar aur nimbu ke sath mix karein."
    ),
    (
        "Sprouted Kala Chana with Ginger & Green Chilli",
        "Ankurit Kala Chana Adrak ke Sath",
        "1 bowl (120g)",
        155, 9.5, 24.0, 2.0,
        "Morning pre-workout breakfast",
        "Live enzymatic active energy and high-fiber endurance matrix",
        "Chane ko 2 din ankurit karein aur kacha ya halka steam karke khayein."
    ),

    # 3. Dry Fruits, Dates & Iron Powerhouses
    (
        "Soaked Afghani Munakka & Black Raisins (15 Pieces)",
        "Bheegi Hui Munakka aur Kaali Kishmish",
        "1 small bowl (15 pieces)",
        85, 1.2, 21.0, 0.2,
        "Subah uthte hi khali pet",
        "Restores glycogen stores and boosts hemoglobin for cellular oxygen efficiency",
        "Raat ko saaf paani mein bhigo kar subah paani sahit lein."
    ),
    (
        "Soaked Royal Figs (Anjeer) with Warm Water",
        "Bheega Anjeer (3 Pieces)",
        "3 medium figs (45g)",
        95, 1.4, 23.0, 0.4,
        "Subah workout se pehle",
        "Dense iron, potassium and magnesium for muscle fatigue prevention",
        "Raat bhar paani mein bhigo kar subah chaba kar khayein."
    ),
    (
        "Medjool Dates Stuffed with Soaked Almonds (3 Dates)",
        "Badaam Bhari Hui Khajoor (3 Dates)",
        "3 dates + 6 almonds",
        175, 4.0, 34.0, 4.5,
        "Workout se 30 min pehle",
        "Immediate ATP boost paired with slow-burning fats for continuous stamina",
        "Khajoor ke beej nikaal kar usme bheege chhile badaam bharein."
    ),
    (
        "Roasted Desi Chana with Jaggery (Gur Chana)",
        "Bhuna Chana aur Desi Gur Snack",
        "1 handful (60g)",
        210, 8.5, 38.0, 2.5,
        "Evening stamina snack ya mid-day energy",
        "Traditional Indian wrestling endurance fuel rich in iron and complex carbs",
        "Ghar ka bhuna chana aur chhota tukda desi gur sath mein chabayein."
    ),

    # 4. Millets & Complex Carbohydrates
    (
        "Warm Ragi Malt Porridge with Milk & Honey",
        "Ragi Malt Doodh aur Shehad",
        "1 big cup (250ml)",
        190, 6.0, 36.0, 3.0,
        "Breakfast ya workout se 90 min pehle",
        "Slow-release complex carbs and bioavailable calcium for core stamina",
        "Ragi aate ko doodh mein pakayein aur ek chammach shehad milayein."
    ),
    (
        "Jowar & Mixed Veggie Khichdi with Mild Tadka",
        "Jowar Sabzi Khichdi Halka Tadka",
        "1 bowl (200g)",
        210, 6.5, 40.0, 3.5,
        "Lunch ya long training session se 2 hr pehle",
        "Gluten-free slow-burn complex starch that sustains mitochondrial glycogen",
        "Kuti hui jowar, moong dal aur sabziyon ko cooker mein paka lein."
    ),
    (
        "Steel Cut Oats Cooked in Cow Milk with Apple Slices",
        "Steel Cut Dalia Doodh aur Seb",
        "1 deep bowl (250g)",
        240, 8.5, 44.0, 4.0,
        "Pre-workout meal 90 min pehle",
        "Beta-glucan fiber releases steady glucose for uninterrupted endurance",
        "Steel cut oats ko doodh mein 10 min pakayein aur seb ke slices dalein."
    ),
    (
        "Boiled Shakarkandi (Sweet Potato) Chaat with Rock Salt & Lemon",
        "Ubli Shakarkandi Chaat Nimbu ke Sath",
        "1 medium bowl (180g)",
        160, 2.8, 38.0, 0.4,
        "Workout se 45-60 min pehle",
        "Low-glycemic sustained starch packed with potassium and vitamin A",
        "Shakarkandi ubaal kar kaatein, sends namak aur nimbu nichodein."
    ),

    # 5. Natural Hydration & Cellular Oxygenators
    (
        "Fresh Coastal Tender Coconut Water with Malai",
        "Taza Dakhini Nariyal Pani Malai ke Sath",
        "1 coconut (300ml)",
        80, 2.0, 14.0, 2.0,
        "Pre ya intra-workout hydration",
        "Bio-identical electrolytes (potassium, magnesium) for cellular pump and stamina",
        "Taza nariyal ka paani aur naram malai turant consume karein."
    ),
    (
        "Sabja (Sweet Basil) Seeds Drink in Lemon Water",
        "Sabja Beej Nimbu Pani Shikanji",
        "1 glass (250ml)",
        45, 1.2, 9.5, 0.5,
        "Pre-workout hydration ya cardio session se pehle",
        "Retains cellular water, reduces body heat and prevents mid-session dehydration",
        "1 chammach sabja beej 15 min paani mein bhigoye aur nimbu milayein."
    ),
    (
        "Fresh Pomegranate Seeds Bowl (Anaar)",
        "Taza Anaar ke Daane Katori",
        "1 bowl (150g)",
        125, 2.5, 28.0, 1.5,
        "Workout se 45 min pehle",
        "Rich in punicalagins that enhance nitric oxide availability in muscle tissue",
        "Taza anaar chheel kar daane thande khayein."
    ),
    (
        "Fresh Amla & Ginger Energy Shot with Pure Honey",
        "Taza Amla Adrak Shot Shehad ke Sath",
        "1 small glass (60ml)",
        50, 0.8, 12.0, 0.1,
        "Morning khali pet",
        "Dense vitamin C and antioxidants to combat exercise-induced oxidative stress",
        "Do amla aur thoda adrak crush karke juice nikalein, 1 chammach shehad dalein."
    ),
    (
        "Traditional Chyawanprash with Warm Cow Milk",
        "Desi Chyawanprash Garam Gaay ke Doodh ke Sath",
        "1 cup milk + 1 spoon chyawanprash",
        185, 7.5, 26.0, 4.5,
        "Subah uthkar ya sone se pehle",
        "Ayurvedic adaptogen formulation for lung capacity and immune stamina",
        "1 chamach chyawanprash khayein aur upar se gunguna doodh piyein."
    ),

    # 6. Traditional Desi Porridges & Light Endurance Meals
    (
        "Traditional Moong Dal & Brown Rice Khichdi",
        "Moong Dal Brown Rice Khichdi",
        "1 bowl (220g)",
        225, 8.5, 42.0, 3.5,
        "Workout se 2 ghante pehle",
        "Effortless gastric clearance with balanced amino-carbohydrate sustained energy",
        "Peeli moong dal aur brown rice ko halki haldi jeera ke sath banayein."
    ),
    (
        "Steamed Rice & Urad Dal Idlis with Sambar (3 Idlis)",
        "Ghar ki Taza Idli Sambar (3 Idli)",
        "3 idlis + sambar (200g)",
        210, 7.0, 42.0, 2.0,
        "Morning endurance training meal",
        "Fermented natural bioavailable carbohydrates for rapid endurance fueling",
        "Bhaap mein paki idli ko patle daal sambar ke sath lein."
    ),
    (
        "Homestyle Poha with Peanuts, Curry Leaves & Lemon",
        "Kanda Batata Poha Moongphali ke Sath",
        "1 plate (160g)",
        220, 6.0, 38.0, 5.5,
        "Breakfast ya 90 min pre-workout",
        "Iron-rich flattened rice with healthy mono-fats for sustained cardio stamina",
        "Poha ko bhigo kar sarson ke daane, kadi patta aur moongphali ke sath banayein."
    ),
    (
        "Vegetable Rava Upma with Green Peas & Carrots",
        "Sabzi Rava Upma Matar Gajar ke Sath",
        "1 bowl (180g)",
        205, 5.5, 39.0, 3.5,
        "Morning endurance fuel",
        "Complex semolina matrix that provides gradual glucose delivery to active muscles",
        "Rava ko roast karke gajar, matar aur rai ke sath upma banayein."
    ),
    (
        "Moong Dal Chilla with Fresh Mint & Coriander Chutney",
        "Moong Dal Chilla Pudina Chutney",
        "2 medium chillas (140g)",
        190, 11.0, 28.0, 4.0,
        "Workout se 75 min pehle",
        "High protein, high potassium savory pancake for steady muscle pacing",
        "Pisi hui moong dal ka patla ghol bana kar tawa par sekhein."
    ),
    (
        "Sattu Stuffed Whole Wheat Paratha with Mint Curd",
        "Sattu Bhara Paratha Pudina Dahi ke Sath",
        "1 paratha + 1/2 cup curd",
        240, 9.5, 38.0, 5.5,
        "Heavy workout se 2 ghante pehle",
        "Long-lasting fuel that keeps stamina steady throughout intensive endurance",
        "Sattu mein ajwain aur nimbu bhar kar gehu ke aate mein belein aur sekhein."
    ),

    # 7. Fruits, Hydration & Sustained Energy
    (
        "Ripe Bananas with Sliced Almonds & Chia Seeds",
        "Paka Kela Badaam Chia Beej ke Sath",
        "1 large banana + nuts (130g)",
        165, 3.5, 32.0, 3.0,
        "Workout se 30 min pehle",
        "Tri-carbohydrate fuel (glucose, fructose, starch) for immediate and mid-workout drive",
        "Kela kaat kar uspar chia seeds aur bareek badaam daal kar lein."
    ),
    (
        "Fresh Watermelon Cubes with Fresh Mint Leaves",
        "Taza Tarbooz ke Tukde Pudina ke Sath",
        "1 large bowl (250g)",
        75, 1.5, 18.0, 0.4,
        "Cardio workout se 40 min pehle",
        "L-citrulline rich fruit that dilates blood vessels and delays aerobic fatigue",
        "Thanda tarbooz kaatein aur taza pudina ke patte daal kar khayein."
    ),
    (
        "Fresh Mosambi (Sweet Lime) Juice with Mint",
        "Taza Mosambi Juice Pudina ke Sath",
        "1 large glass (250ml)",
        90, 1.5, 21.0, 0.3,
        "Workout se 45 min pehle",
        "Immediate cellular hydration and citric acid cycle energy booster",
        "Mosambi ka fresh juice nikalein, bina chini ke lein."
    ),
    (
        "Curd Rice (Dahi Chawal) with Mustard Seeds & Curry Leaves",
        "Dahi Bhaat Sarson Kadi Patta Tadka",
        "1 bowl (200g)",
        210, 6.5, 38.0, 3.5,
        "High endurance running/cycling day meal",
        "Natural cooling probiotics and easy-digesting glycogen recharge",
        "Uble chawal ko taazi dahi mein mix karein aur rai-kadi patta ka halka chhonk lagayein."
    ),
    (
        "Sprouted Moong & Pomegranate Salad with Lemon",
        "Ankurit Moong aur Anaar Salad",
        "1 bowl (150g)",
        135, 7.5, 24.0, 1.0,
        "Workout se 1 ghanta pehle",
        "High chlorophyll and enzyme-dense live nutrients for maximum stamina",
        "Ankurit moong aur anaar ke daano ko nimbu nichod kar mix karein."
    ),
    (
        "Ganne ka Taza Ras (Sugarcane Juice) with Ginger & Lemon",
        "Taza Ganne ka Ras Adrak Nimbu",
        "1 glass (250ml)",
        130, 0.5, 32.0, 0.2,
        "Long training session se pehle ya mid-session",
        "Pure plant-based simple sugars for explosive endurance rehydration",
        "Fresh ganne ka ras adrak aur pudina ke sath direct piyein."
    ),
    (
        "Til (Sesame Seeds) & Desi Jaggery Ladoo (2 Pieces)",
        "Til Gur Ladoo (2 Pieces)",
        "2 medium ladoos (50g)",
        190, 4.5, 26.0, 8.0,
        "Workout se 45 min pehle",
        "High zinc, calcium, iron and healthy fats for sustained metabolic stamina",
        "Bhune til aur garam desi gur ko milakar gol ladoo banayein."
    ),
    (
        "Roasted Makhana (Fox Nuts) with Light Haldi & Ghee",
        "Bhuna Makhana Haldi Desi Ghee",
        "1 big bowl (40g)",
        145, 3.8, 26.0, 3.0,
        "Pre-workout light munching",
        "Low glycemic complex carbohydrates that prevent mid-workout sluggishness",
        "Aadha chammach gaay ke ghee mein makhana aur haldi bhun kar khayein."
    ),
    (
        "Warm Turmeric Almond Milk with Saffron (Kesar Badam Doodh)",
        "Haldi Kesar Badam Doodh",
        "1 big mug (250ml)",
        175, 7.0, 18.0, 6.0,
        "Raat ko sone se pehle for next-day stamina",
        "Cellular recovery, reduces inflammation, and recharges deep stamina",
        "Gaay ke doodh mein pisa badaam, haldi aur 2 dhaage kesar ubaal kar piyein."
    )
]

# 15 Authentic Accompaniments for 35 Dishes = 35 * 15 = 525 Home Items
STAMINA_HOME_MODS = [
    ("(Standard Endurance Portion)", "(Standard Endurance Portion)", 1.0, "Standard sustained-stamina portion."),
    ("(Double Endurance Portion)", "(Double Portion)", 1.4, "High-volume glycogen endurance portion."),
    ("(Light Endurance Fuel Serving)", "(Light Endurance Serving)", 1.12, "Calibrated light endurance serving."),
    ("with 1 Glass Fresh Coconut Water", "1 Glass Taza Nariyal Pani ke Sath", 1.15, "Added natural isotonic electrolytes for enhanced cellular hydration."),
    ("with Fresh Mint & Coriander Chutney", "Pudina Dhaniya Chutney ke Sath", 1.03, "Phytochemical digestive enzymes for smoother nutrient assimilation."),
    ("with 1 Spoon Desi Cow Ghee", "1 Chammach Desi Gaay ke Ghee ke Sath", 1.25, "Healthy medium-chain lipids for sustained endurance wattage."),
    ("with Fresh Homemade Curd", "Ghar ki Taza Dahi ke Sath", 1.18, "Probiotic gut support and cooling endurance hydration."),
    ("with Handful of Soaked Almonds", "Bheege Badaam ke Sath", 1.28, "Vitamin E and magnesium to prevent exercise muscle cramping."),
    ("with Squeeze of Fresh Lemon", "Taza Nimbu ke Sath", 1.01, "Vitamin C bio-enhancer for maximum cellular iron absorption."),
    ("with 1 Spoon Organic Honey", "1 Chammach Shehad ke Sath", 1.15, "Fast-acting fructose-glucose glycogen spark."),
    ("with Roasted Chia Seeds", "Bhune Chia Beej ke Sath", 1.08, "Hydrophilic seeds that optimize cellular fluid balance."),
    ("with Sliced Cucumber & Tomato", "Kheera Tamatar Salad ke Sath", 1.04, "Water-dense micronutrients for prolonged aerobic training."),
    ("with 1 Cup Warm Green Tea", "1 Cup Green Tea ke Sath", 1.02, "EGCG catechins that stimulate aerobic fat burning."),
    ("with 2 Medjool Dates", "2 Khajoor ke Sath", 1.22, "Immediate simple sugar burst for high-tempo intervals."),
    ("with 1 Glass Light Spiced Chaas", "1 Glass Masala Chaas ke Sath", 1.1, "Bioactive electrolytes for prolonged sweat resistance.")
]

STAMINA_SUPPS_BASE = [
    (
        "Beta-Alanine Endurance Powder (3.2g Pure CarnoSyn)",
        "Beta-Alanine Stamina Powder",
        "1 scoop (3.2g) in 250ml water",
        15, 3.2, 0.0, 0.0,
        "Workout se 20-30 min pehle",
        "Synthesizes intracellular carnosine, buffering lactic acid and delaying muscle burn",
        "Paani mein mix karke workout se aadha ghanta pehle piyein."
    ),
    (
        "Beetroot Extract Endurance Powder (RedNite 500mg)",
        "Beetroot Extract Nitrate Powder",
        "1 scoop (5g) in 300ml water",
        20, 0.5, 4.0, 0.0,
        "Workout se 60-90 min pehle",
        "High-concentration natural dietary nitrates maximize VO2 max and oxygen delivery",
        "Thande paani mein ghol kar training se 1 ghanta pehle lein."
    ),
    (
        "Cordyceps Sinensis Organic Extract (1000mg)",
        "Cordyceps Mushroom Stamina Capsule",
        "2 veg capsules",
        5, 0.5, 0.8, 0.0,
        "Subah breakfast ke sath ya pre-workout",
        "Enhances cellular ATP generation and improves respiratory oxygen uptake",
        "Paani ke sath nigalein. Stamina aur running endurance ke liye ideal."
    ),
    (
        "Rhodiola Rosea Adaptogen Extract (3% Rosavins 500mg)",
        "Rhodiola Rosea Anti-Fatigue Capsule",
        "1 capsule",
        4, 0.2, 0.6, 0.0,
        "Morning pre-workout",
        "Combats central nervous fatigue and sustains physical output during long runs",
        "Subah paani ke sath lein. Mental aur physical stamina banata hai."
    ),
    (
        "Coenzyme Q10 (CoQ10 Ubiquinone 100mg Softgel)",
        "CoQ10 Mitochondrial Energy Softgel",
        "1 softgel",
        8, 0.0, 0.2, 0.8,
        "Subah breakfast ke sath",
        "Core electron-transport cofactor essential for cellular ATP mitochondrial synthesis",
        "Khane ke sath 1 softgel lein for sustained daily stamina."
    ),
    (
        "L-Carnitine L-Tartrate Pure Liquid (3000mg)",
        "L-Carnitine Liquid Endurance Shot",
        "1 tablespoon (15ml)",
        10, 0.0, 2.5, 0.0,
        "Workout se 20 min pehle",
        "Transports long-chain fatty acids into mitochondria to be burned as endurance fuel",
        "Direct 1 chamach piyein ya thode paani mein mix karein."
    ),
    (
        "Endurance Electrolyte Hydration Matrix (Na, K, Mg, Zn)",
        "Endurance Electrolyte Powder Drink",
        "1 sachet (10g) in 500ml water",
        35, 0.0, 8.5, 0.0,
        "Intra-workout running/cycling sip by sip",
        "Maintains osmotic cellular balance, prevents heat exhaustion and muscle cramps",
        "500ml shaker mein gholein aur workout ke dauran ghut-ghut piyein."
    ),
    (
        "Glycerol Monostearate (HydroMax 65% Pure 2500mg)",
        "HydroMax Cellular Hydration Powder",
        "1 scoop (3g) in 400ml water",
        15, 0.0, 3.5, 0.0,
        "Workout se 45 min pehle copious water ke sath",
        "Hyperhydrates muscle cells, improving endurance in high heat and long sessions",
        "Bade glass paani ke sath acche se ghol kar piyein."
    ),
    (
        "Highly Branched Cyclic Dextrin (Cluster Dextrin 25g)",
        "Cluster Dextrin Smooth Intra-Workout Carbs",
        "1 scoop (25g) in 400ml water",
        100, 0.0, 25.0, 0.0,
        "Workout ke dauran (Intra-workout)",
        "Rapid gastric transit with steady prolonged blood glucose without insulin crash",
        "Intra-workout shaker mein ghol kar training ke dauran piyein."
    ),
    (
        "Essential Amino Acids (EAA + BCAA Fermented 8g)",
        "EAA Endurance Intra-Workout Drink",
        "1 scoop (10g) in 350ml water",
        30, 7.5, 0.5, 0.0,
        "Intra-workout ya long training",
        "Prevents exercise-induced muscle protein breakdown during prolonged endurance",
        "Thande paani mein shake karke workout ke beech mein lein."
    ),
    (
        "L-Citrulline Malate 2:1 Fermented (6000mg)",
        "Citrulline Malate Pure Pump Powder",
        "1 scoop (6g) in 300ml water",
        15, 0.0, 3.5, 0.0,
        "Workout se 30 min pehle",
        "Increases plasma arginine, nitric oxide and aerobic ATP production by 34%",
        "Paani ya pre-workout drink mein milakar workout se pehle lein."
    ),
    (
        "Organic Spirulina & Chlorella Tablets (3000mg)",
        "Spirulina Superfood Stamina Tablets",
        "6 tablets (3g)",
        12, 2.0, 0.8, 0.2,
        "Subah breakfast ke sath",
        "Bioavailable plant iron and chlorophyll that enhance cellular oxygen saturation",
        "Paani ke sath subah nihar munh ya nashte ke baad lein."
    ),
    (
        "Pure Himalayan Shilajit Resin (Gold Grade 500mg)",
        "Shuddh Himalayan Shilajit Resin",
        "Pea-sized ball (500mg) in warm water/milk",
        5, 0.2, 0.8, 0.0,
        "Subah khali pet gungune doodh/paani mein",
        "84+ ionic minerals & fulvic acid that turbocharges mitochondrial bioenergetics",
        "Chammach ke pichhle hisse se matar ke daane barabar gungune doodh mein gholein."
    ),
    (
        "Ashwagandha KSM-66 Full Spectrum Root Extract (600mg)",
        "Ashwagandha KSM-66 VO2 Max Capsule",
        "1 veg capsule",
        5, 0.2, 0.9, 0.0,
        "Raat ko sone se pehle ya post workout",
        "Clinically proven to enhance cardiorespiratory endurance (VO2 max) and stamina",
        "1 capsule gungune doodh ya paani ke sath lein."
    ),
    (
        "Isotonic Carbohydrate Energy Gel Pouch (25g Fast Carbs)",
        "Isotonic Energy Gel Pouch",
        "1 pouch (60ml)",
        100, 0.0, 25.0, 0.0,
        "Long running/cycling mein har 45 min baad",
        "Dual-source rapid carbohydrate delivery engineered for non-stop endurance pacing",
        "Pouch khol kar direct consume karein, bina paani ke bhi asaan."
    )
]

# 15 Serving Modes for 15 Supplements = 15 * 15 = 225 Supplement Items
STAMINA_SUPP_MODS = [
    ("in Chilled Water", "Thande Paani mein", 1.0, "Standard chilled water dilution."),
    ("in Fresh Coconut Water", "Taza Nariyal Paani mein", 1.35, "Electrolyte-rich coconut water suspension for hyper-endurance."),
    ("with Squeeze of Fresh Lemon", "Taza Nimbu ke Sath", 1.02, "Vitamin C bio-activation matrix."),
    ("in Room Temperature Water", "Sadharan Paani mein", 1.0, "Rapid absorption room temperature hydration."),
    ("with 1 Spoon Pure Honey", "1 Chammach Shehad ke Sath", 1.25, "Dual carbohydrate fuel for immediate stamina."),
    ("with Pinch of Pink Himalayan Salt", "Sendha Namak ke Sath", 1.01, "Optimized sodium balance preventing exercise hyponatremia."),
    ("in Mint Infused Iced Water", "Pudina Baraf Paani mein", 1.02, "Cooling menthol endurance hydration."),
    ("in Fresh Mosambi Juice", "Mosambi Juice mein", 1.45, "Citrus fructose delivery speeding up gastric emptying."),
    ("with Chia Seed Gel Infusion", "Chia Seed Paani ke Sath", 1.15, "Sustained hydration suspension."),
    ("in Warm Water", "Gungune Paani mein", 1.0, "Rapid gastric dissipation in warm water."),
    ("in Low-Fat Skimmed Milk", "Skimmed Doodh mein", 1.4, "Slow-absorbing casein peptide matrix."),
    ("with Submerged Ice Cubes", "Baraf ke Tukdon ke Sath", 1.0, "Cold thermoregulatory performance drink."),
    ("with 1 Spoon Organic Jaggery Powder", "Desi Gur ke Sath", 1.25, "Iron-enriched unrefined sucrose endurance push."),
    ("in Fresh Orange Juice", "Taza Santre ke Ras mein", 1.42, "Potassium and natural bioflavonoid synergy."),
    ("with Coconut Water & Chia Seeds", "Nariyal Paani aur Chia Beej ke Sath", 1.48, "Ultimate marathon-grade cellular endurance suspension.")
]
