"""
Weight Loss Database Base Definitions
70% Indian Home Foods (490 items: 35 base dishes x 14 accompaniments)
30% Gym Supplements (210 items: 15 base supplements x 14 serving modes)
Total: 700 items
Focus: Sustainable, long-term weekly mass reduction, satiety-driven, nutrient-dense macronutrient ratios.
"""

WEIGHT_LOSS_HOME_BASE = [
    # 1. Balanced Multigrain Staples & High-Satiety Legumes
    (
        "Multigrain Phulka (Wheat, Jowar & Ragi) with Moong Dal",
        "Multigrain Roti Moong Dal ke Sath",
        "2 rotis + 1 bowl dal (220g)",
        210, 8.5, 38.0, 3.2,
        "Lunch ya dinner mein",
        "High dietary fiber from ancient grains keeps you comfortably full for 4 hours without lethargy",
        "Jowar, ragi aur gehu ke aate ki do patli roti banayein aur peeli moong dal ke sath lein."
    ),
    (
        "Traditional Jowar (Sorghum) Bhakri with Smoked Baingan Bharta",
        "Jowar Bhakri Baingan Bharta ke Sath",
        "1 bhakri + 1 bowl bharta",
        195, 6.0, 36.0, 3.5,
        "Lunch mein",
        "Gluten-free resistant starch maintains steady blood sugar, preventing afternoon hunger pangs",
        "Jowar ke aate ki tawa par paki bhakri ko tamatar aur matar wale bhuna baingan ke sath khayein."
    ),
    (
        "Ragi (Finger Millet) Roti with Steamed Lauki Sabzi",
        "Ragi Roti Lauki ki Sabzi ke Sath",
        "2 thin rotis + 1 bowl lauki",
        185, 5.5, 35.0, 2.8,
        "Dinner mein",
        "Rich in dietary calcium and amino acid tryptophan that curbs late-night snacking cravings",
        "Ragi ke aate ko gungune paani se gundh kar roti banayein, jeera lauki ke sath lein."
    ),
    (
        "Homestyle Dal Khichdi with Fresh Curd & Roasted Papad",
        "Ghar ki Dal Khichdi Dahi aur Bhuna Papad",
        "1 plate (200g khichdi + curd)",
        225, 8.8, 39.0, 3.8,
        "Light dinner",
        "Easy-to-digest complete protein and carbohydrate ratio that supports sustainable weekly fat reduction",
        "Chawal aur peeli moong dal ko cooker mein haldi jeera ke sath banayein, dahi ke sath lein."
    ),
    (
        "Vegetable & Green Peas Brown Rice Pulao with Mint Raita",
        "Brown Rice Matar Pulao Pudina Raita",
        "1 bowl pulao + 1/2 cup raita",
        215, 6.5, 41.0, 3.0,
        "Lunch staple",
        "Intact whole grain bran delays stomach emptying while cooling mint raita soothes digestion",
        "Brown rice mein gajar, matar aur jeera daal kar banayein, taaza pudina raita ke sath khayein."
    ),

    # 2. Ayurvedic & Traditional Metabolic Powerhouses (Kulthi, Methi, Lauki)
    (
        "Sprouted Horse Gram (Kulthi Dal) Fat Cutter Soup",
        "Kulthi Dal Patla Soup Jeera Lehsun",
        "1 deep bowl (250ml)",
        115, 8.2, 18.0, 1.2,
        "Lunch se 30 min pehle ya evening",
        "Traditional Ayurvedic legume with polyphenol extracts known for speeding up sluggish lipid metabolism",
        "Kulthi dal ko ubaal kar lehsun, hing aur jeera ka tadka lagayein aur gunguna piyein."
    ),
    (
        "Moong Dal & Fresh Palak (Spinach) Cheela with Green Chutney",
        "Moong Dal Palak Cheela Hara Dhaniya Chutney",
        "2 cheelas (140g)",
        175, 9.5, 24.0, 4.0,
        "Morning breakfast",
        "Zero refined flour, packed with bioavailable plant iron and sustained amino acids",
        "Bheegi moong dal aur barik kate palak ko pees kar tawa par patla sekhein."
    ),
    (
        "Lauki (Bottle Gourd) & Chana Dal with 1 Whole Wheat Roti",
        "Lauki Chana Dal 1 Gehu Phulka ke Sath",
        "1 bowl dal + 1 roti",
        195, 8.0, 33.0, 3.2,
        "Lunch mein",
        "Classic nutrient-dense combo pairing high water-volume bottle gourd with satiating Bengal gram",
        "Lauki aur chana dal ko cooker mein tamatar aur jeera ke sath paka lein."
    ),
    (
        "Steamed Besan & Veggie Dhokla (3 Pieces) with Coriander Chutney",
        "Ghar ka Bhaap Dhokla Dhaniya Chutney (3 Piece)",
        "3 pieces (120g)",
        155, 6.2, 26.0, 2.5,
        "Evening tea snack ya breakfast",
        "Fermented low-oil snack that triggers positive gut microbiomes while keeping calorie load minimal",
        "Besan aur dahi ke ghol ko bhaap mein 15 min pakayein, rai kadi patta se garnish karein."
    ),
    (
        "Boiled Lobia (Black Eyed Peas) Curry with 1 Multigrain Phulka",
        "Lobia Curry 1 Multigrain Roti ke Sath",
        "1 bowl lobia + 1 roti",
        205, 9.5, 36.0, 2.8,
        "Lunch mein",
        "Outstanding soluble fiber to calorie ratio, stabilizing insulin output throughout the day",
        "Bheege lobia ko tamatar pyaz ki halki gravy mein banayein aur multigrain roti ke sath lein."
    ),

    # 3. Clean Lean Home Proteins for Muscle Sparing
    (
        "Homestyle Skinless Chicken Curry (Light Gravy) with 1 Roti",
        "Ghar ki Patli Chicken Curry 1 Roti ke Sath",
        "1 bowl chicken (150g) + 1 roti",
        235, 28.0, 20.0, 5.0,
        "Lunch ya dinner mein",
        "High thermic effect animal protein in light tomato gravy, keeping energy high while body slims down",
        "Skinless chicken breast ko tamatar, pyaz, haldi aur jeera ki patli gravy mein pakayein."
    ),
    (
        "Tawa Grilled Surmai Fish Fillet with Lemon & Mint Rings",
        "Tawa Surmai Machhli Tikka Nimbu Pudina",
        "150g grilled fish",
        170, 29.0, 2.0, 5.5,
        "Dinner protein",
        "Marine omega-3 fatty acids reduce chronic systemic inflammation that hinders fat loss",
        "Surmai machhli fillet par ajwain, nimbu aur halki haldi laga kar tawa par halka sekein."
    ),
    (
        "Low-Fat Paneer & Bell Pepper Bhurji with 1 Phulka",
        "Low-Fat Paneer Shimla Mirch Bhurji 1 Roti",
        "1 bowl bhurji (130g) + 1 roti",
        220, 16.5, 24.0, 6.8,
        "Dinner ya breakfast",
        "Steady-digesting casein and crisp bell pepper vitamin C fuel a sustainable fat burning deficit",
        "Low-fat paneer ko barik kati shimla mirch, tamatar aur jeera ke sath tawa par sauté karein."
    ),
    (
        "Boiled Whole Egg & 3 Whites Salad with Sliced Cucumber",
        "1 Pura Ubla Anda aur 3 Safedi Kheera Salad",
        "4 eggs (1 whole + 3 whites) + salad",
        150, 21.0, 3.5, 5.5,
        "Breakfast ya evening post-workout",
        "Maximum biological value protein ensuring you lose pure fat, not firm muscle tissue",
        "Ande ubaal kar kaatein, kheera tamatar aur taaza nimbu nichod kar khayein."
    ),
    (
        "Steamed Soya Granules & Matar Upma with Mustard Seeds",
        "Soya Granules Matar Upma Sarson Tadka",
        "1 bowl (180g)",
        185, 14.5, 24.0, 3.2,
        "Morning breakfast",
        "High plant protein upgrade to traditional upma, delivering deep satiety on low calories",
        "Bheege soya granules aur sooji ko gajar, matar aur rai tadka ke sath banayein."
    ),

    # 4. Wholesome Sustained-Energy Carbohydrates & Porridges
    (
        "Vegetable Broken Wheat Daliya with Carrots & French Beans",
        "Sabzi Dalia Khichdi Gajar Beans",
        "1 deep bowl (220g)",
        175, 6.5, 34.0, 1.8,
        "Lunch ya dinner",
        "Complex unpolished cereal fiber clears digestive sluggishness and prevents constipation on a diet",
        "Gehu ka dalia, gajar, beans aur jeera ko cooker mein do seeti lagakar paka lein."
    ),
    (
        "Rolled Oats Porridge with Skimmed Milk & Apple Slices",
        "Oats Porridge Skimmed Doodh aur Seb",
        "1 bowl (200g)",
        190, 8.0, 33.0, 2.8,
        "Breakfast",
        "Beta-glucan fiber delays digestion, keeping sweet cravings at zero until lunch",
        "Rolled oats ko toned doodh mein pakayein aur upar se taaza seb ke slices dalein."
    ),
    (
        "Methi Missi Roti (Besan + Wheat + Methi) with Plain Curd",
        "Methi Missi Roti Saadi Dahi ke Sath",
        "1 roti (80g) + 1/2 cup curd",
        180, 7.5, 27.0, 4.5,
        "Lunch staple",
        "Besan and fenugreek greens provide high protein and chromium to balance insulin curves",
        "Gehu aur chane ke aate mein taaza methi gundh kar tawa par sekhein, dahi ke sath lein."
    ),
    (
        "Flattened Rice Poha with Roasted Peanuts & Squeezed Lime",
        "Ghar ka Poha Bhuni Moongphali Nimbu",
        "1 plate (150g)",
        195, 5.0, 36.0, 4.0,
        "Breakfast",
        "Light iron-rich carbohydrate base that provides easy energy without feeling heavy",
        "Poha ko dho kar rai, kadi patta, haldi aur thodi moongphali ke sath banayein."
    ),
    (
        "Boiled Sweet Potato (Shakarkandi) & Peanut Chaat with Lemon",
        "Shakarkandi Moongphali Chaat Nimbu ke Sath",
        "1 bowl (160g)",
        165, 3.8, 32.0, 3.0,
        "Evening 4 PM snack",
        "High dietary potassium and carotenoids satisfy natural sweet urges on low calories",
        "Ubli shakarkandi ko kaat kar bhuni moongphali aur taaza nimbu ke sath mix karein."
    ),

    # 5. Low-Calorie Curries & Gut Cleansers
    (
        "Homestyle Bhindi (Okra) Masala with 1 Multigrain Roti",
        "Ghar ki Sukhi Bhindi 1 Multigrain Roti ke Sath",
        "1 bowl bhindi + 1 roti",
        185, 4.8, 30.0, 4.5,
        "Lunch ya dinner",
        "Mucilage soluble fiber binds with dietary cholesterol and excess bile, flushing it out",
        "Bhindi ko pyaz aur jeera ke sath kam tel mein crispy banayein, roti ke sath lein."
    ),
    (
        "Tori (Ridge Gourd) Curry with 1 Whole Wheat Phulka",
        "Tori ki Tariwali Sabzi 1 Roti ke Sath",
        "1 bowl tori + 1 roti",
        160, 4.2, 28.0, 2.5,
        "Light dinner",
        "Ultra-hydrating vegetable with rich cellulose fiber, soothing gut and easing digestion",
        "Taaza tori ko tamatar aur jeera ke sath patli gravy mein paka lein."
    ),
    (
        "Boiled Kala Chana Gravy with 1 Cup Steamed Brown Rice",
        "Kala Chana Gravy 1 Cup Brown Rice ke Sath",
        "1 bowl chana + 1 cup rice (200g)",
        220, 8.5, 40.0, 2.8,
        "Wholesome Sunday lunch",
        "Unrefined complex carbs and legume protein ensure 100% sustainable weekly progress",
        "Bheege kale chane ko tamatar pyaz ki gravy mein banayein, brown rice ke sath lein."
    ),
    (
        "Masoor Dal (Pink Lentils) with Steamed Gobhi & Matar",
        "Masoor Dal Gobhi Matar Sabzi ke Sath",
        "1 bowl dal + 1 bowl sabzi",
        190, 9.8, 32.0, 2.5,
        "Lunch staple",
        "Quick-cooking split lentils packed with folate and fiber that keep belly flat and full",
        "Masoor dal ko patla banayein aur gobhi matar ki sukhi sabzi ke sath consume karein."
    ),
    (
        "Fresh Anar (Pomegranate) & Curd Protein Crunch Bowl",
        "Taaza Anaar Dahi Crunch Bowl",
        "1 bowl (180g)",
        135, 5.5, 23.0, 2.2,
        "Midday snack ya dessert replacement",
        "Punicalagin antioxidants and live lactobacillus cultures optimize gut microbiome for weight loss",
        "Ghar ki taaza dahi mein meetha anaar daal kar thanda serve karein."
    ),

    # 6. Cleansing Natural Tonics & Hydration Habits
    (
        "Cucumber, Mint & Coriander Natural Cooling Chaas",
        "Kheera Pudina Dhaniya Thandi Chaas",
        "1 tall glass (300ml)",
        55, 3.8, 6.5, 1.0,
        "Meal ke baad ya 4 PM snack",
        "Natural digestive acids stimulate liver bile while electrolytes prevent heat exhaustion",
        "Ghar ki dahi mein thanda paani, kheera, pudina aur jeera churn karein."
    ),
    (
        "Roasted Makhana with Roasted Flax Seeds (Alsi ke Beej)",
        "Bhuna Makhana Alsi Beej Crunch Snack",
        "1 big bowl (40g)",
        145, 4.2, 22.0, 4.5,
        "Evening tea companion",
        "ALA plant omega-3 fatty acids and crunchy lotus seeds satisfy mindless munching habits",
        "Makhana aur alsi ke beej ko tawa par dry roast karein, halka sendha namak milayein."
    ),
    (
        "Warm Ceylon Cinnamon & Lemon Morning Metabolism Water",
        "Gunguna Dalchini Nimbu Paani",
        "1 large glass (250ml)",
        12, 0.1, 2.0, 0.0,
        "Subah uthte hi khali pet",
        "Primes digestive enzymes and sensitizes muscle insulin receptors for the day ahead",
        "Dalchini powder ko garam paani mein 3 min boil karein aur taaza nimbu nichodein."
    ),
    (
        "Fresh Sprouted Moong & Kala Chana Chaat with Grated Raw Mango",
        "Taza Ankurit Moong Chana Chaat Kairi ke Sath",
        "1 bowl (150g)",
        140, 8.8, 23.0, 1.2,
        "11 AM mid-morning snack",
        "Crunchy enzyme-dense seeds that eliminate midday fatigue and prevent overeating at lunch",
        "Ankurit moong aur chane mein kacchi kairi, tamatar aur nimbu mix karein."
    ),
    (
        "Fresh Papaya Cubes with Lemon & Mint Leaves",
        "Taaza Papita Nimbu Pudina ke Sath",
        "1 large bowl (200g)",
        75, 1.2, 17.5, 0.3,
        "Evening snack",
        "Digestive enzyme papain assists protein digestion and naturally eases water retention",
        "Papita kaat kar taaza nimbu aur pudina ke sath thanda serve karein."
    ),
    (
        "Fresh Mosambi & Orange Slices with Citrus Fiber",
        "Taaza Mosambi Santra Slices",
        "2 fruits (200g)",
        85, 1.6, 19.0, 0.3,
        "Afternoon refreshment",
        "High dietary pectin and hesperidin bioflavonoids protect blood vessels during weight loss",
        "Mosambi aur santre ko chheel kar bina juice nikale direct pulp sahit khayein."
    ),
    (
        "Roasted Desi Chana with Cucumber & Onion Salad",
        "Bhuna Chana Kheera Pyaz Salad",
        "1 bowl (120g)",
        160, 8.2, 26.0, 2.5,
        "4 PM tea time snack",
        "High fiber crunch keeps chewing satiety high without adding invisible calories",
        "Bhune chane mein barik kata kheera, pyaz aur taaza nimbu mix karein."
    ),
    (
        "Warm Jeera (Cumin) & Saunf (Fennel) Bloat-Relief Tea",
        "Garam Jeera Saunf Paani",
        "1 large mug (250ml)",
        8, 0.2, 1.5, 0.0,
        "Khana khane ke 30 min baad",
        "Carminative volatile oils relieve water bloating, digestive gas and abdominal puffiness",
        "Jeera aur saunf ko paani mein 5 min ubaalein aur gunguna chhan kar piyein."
    ),
    (
        "Karela (Bitter Gourd) & Onion Sabzi with 1 Whole Wheat Roti",
        "Karela Pyaz Sabzi 1 Gehu Phulka",
        "1 bowl karela + 1 roti",
        175, 4.5, 29.0, 3.5,
        "Lunch mein",
        "Active charantin and polypeptide-p drive glucose into active muscles rather than fat cells",
        "Karela ko pyaz aur jeera ke sath kam tel mein pakayein, roti ke sath lein."
    ),
    (
        "Steamed Idlis with Vegetable Sambar (3 Idlis)",
        "3 Bhaap Idli Sabzi Sambar ke Sath",
        "3 idlis + 1 bowl sambar (220g)",
        210, 7.5, 42.0, 2.2,
        "Breakfast staple",
        "Fermented breakfast providing sustained energy, light on stomach with zero trans fats",
        "Chawal aur urad dal ki bhaap idli ko vegetable sambar ke sath consume karein."
    )
]

# 14 Authentic Accompaniments / Serving Variations for 35 Dishes = 35 * 14 = 490 Home Items
WEIGHT_LOSS_HOME_MODS = [
    ("(Standard Weight Reduction Portion)", "(Standard Portion)", 1.0, "Standard balanced weight reduction portion."),
    ("(High-Satiety Double Portion)", "(Double Satiety Portion)", 1.35, "Increased volume portion for high satiety days."),
    ("(Light Balanced Serving)", "(Light Balanced Serving)", 1.1, "Calibrated light sustainable serving."),
    ("with 1 Small Bowl Homemade Curd", "1 Chhoti Katori Dahi ke Sath", 1.15, "Probiotic calcium supporting healthy body composition."),
    ("with Fresh Cucumber & Mint Raita", "Kheera Pudina Raita ke Sath", 1.12, "Cooling digestive hydration expanding stomach volume."),
    ("with 1 Glass Spiced Chaas (Buttermilk)", "1 Glass Masala Chaas ke Sath", 1.12, "Hydrating electrolytes with minimal calorie impact."),
    ("with Mint & Coriander Green Chutney", "Pudina Dhaniya Chutney ke Sath", 1.02, "Fresh chlorophyll and herbal digestive stimulation."),
    ("with Squeeze of Fresh Lemon", "Taaza Nimbu ke Sath", 1.01, "Vitamin C bioflavonoids enhancing metabolic health."),
    ("with 1 Cup Warm Green Tea", "1 Cup Garam Green Tea ke Sath", 1.02, "Catechin antioxidants accelerating fat oxidation."),
    ("with Handful of Roasted Peanuts & Chana", "Bhuni Moongphali Chana ke Sath", 1.22, "Healthy fats and crunch that prevent between-meal cravings."),
    ("with 1 Roasted Papad", "1 Bhuna Papad ke Sath", 1.08, "Crisp zero-oil digestive crunch."),
    ("with Sliced Tomato & Onion Salad", "Tamatar Pyaz Salad ke Sath", 1.04, "Raw dietary fiber supporting smooth gut clearance."),
    ("with 1 Spoon Roasted Flax Seeds (Alsi)", "1 Chammach Bhuni Alsi ke Sath", 1.1, "Plant omega-3 fatty acids for cardiovascular and fat health."),
    ("with Warm Cinnamon Water", "Garam Dalchini Paani ke Sath", 1.01, "Post-meal insulin and glucose stabilizing hydration.")
]

WEIGHT_LOSS_SUPPS_BASE = [
    (
        "Complete Plant-Based Meal Replacement Shake (22g Protein)",
        "Plant Meal Replacement Satiety Shake",
        "1 scoop (35g) in 300ml water",
        135, 22.0, 7.0, 1.8,
        "Busy lunch replacement ya breakfast",
        "Balanced macronutrients, 5g prebiotic fiber and 24 vitamins for effortless weekly reduction",
        "Thande paani mein shaker mein 20 second shake karke piyein."
    ),
    (
        "Triple Strength Omega-3 Fish Oil (1000mg EPA/DHA)",
        "Omega-3 Fatty Acid Metabolism Softgel",
        "1 softgel daily with lunch",
        10, 0.0, 0.0, 1.1,
        "Lunch ke sath",
        "Regulates hormone leptin and improves cellular insulin sensitivity, avoiding plateaus",
        "Khane ke dauran paani ke sath 1 softgel lein."
    ),
    (
        "Organic Psyllium Husk (Pure Isabgol Fiber 5000mg)",
        "Isabgol Soluble Fiber Appetite Cleanser",
        "1 tablespoon (7g) in 250ml warm water",
        15, 0.2, 3.5, 0.0,
        "Dinner se 30 min pehle ya bedtime",
        "Forms a viscous gel in the stomach that physically creates deep fullness and regularity",
        "Gungune paani mein mix karke turant piyein."
    ),
    (
        "Green Coffee Bean Extract (50% Chlorogenic Acid 500mg)",
        "Green Coffee Bean Glucose Blocker Capsule",
        "1 veg capsule before main meals",
        3, 0.0, 0.6, 0.0,
        "Carbohydrate meal se 20 min pehle",
        "Inhibits glucose release into bloodstream, driving body to utilize stored body fat",
        "Khane se 20 min pehle 1 glass paani ke sath lein."
    ),
    (
        "Multi-Strain Probiotic Complex (50 Billion CFU)",
        "Probiotic Gut Metabolism Optimization Capsule",
        "1 delayed-release capsule",
        2, 0.0, 0.4, 0.0,
        "Subah khali pet ya breakfast ke sath",
        "Optimizes gut microbiome diversity, directly linked to reduced abdominal fat storage",
        "Subah paani ke sath 1 capsule lein."
    ),
    (
        "DigeZyme Multi-Enzyme Digestive Matrix (300mg)",
        "DigeZyme Digestive Enzyme & Bloat Blocker",
        "1 veg capsule with meals",
        2, 0.0, 0.4, 0.0,
        "Heavy lunch ya dinner ke sath",
        "Ensures complete digestion of proteins and carbs, preventing abdominal bloating and sluggishness",
        "Khana khane ke pehle ghut ke sath lein."
    ),
    (
        "L-Glutamine 100% Kyowa Quality Powder (5000mg)",
        "L-Glutamine Craving Stopper & Gut Healer",
        "1 scoop (5g) in 250ml water",
        20, 5.0, 0.0, 0.0,
        "Mid-afternoon 4 PM sweet craving window",
        "Nourishes enterocytes in intestinal lining and successfully halts sudden sugar impulses",
        "Thande paani mein ghol kar piyein."
    ),
    (
        "White Kidney Bean Extract (Phase 2 Carb Blocker 1000mg)",
        "White Kidney Bean Carbohydrate Controller",
        "2 capsules before high-carb meals",
        4, 0.0, 1.0, 0.0,
        "Carb meal se 15 min pehle",
        "Temporarily inhibits alpha-amylase enzyme, reducing digestion of complex dietary starches",
        "Paani ke sath do capsules lein."
    ),
    (
        "Vitamin D3 + K2 Liquid Drops (2000 IU / 100mcg)",
        "Vitamin D3 K2 Metabolic Hormone Drops",
        "4 drops under tongue with meal",
        0, 0.0, 0.0, 0.0,
        "Breakfast ke sath",
        "Restores active vitamin D levels necessary for thyroid signaling and fat tissue breakdown",
        "Nashte ke sath 4 boond lein."
    ),
    (
        "Magnesium Glycinate High Absorption (400mg)",
        "Magnesium Glycinate Deep Sleep & Stress Buffer",
        "2 veg capsules at bedtime",
        5, 0.0, 1.0, 0.0,
        "Raat ko sone se 45 min pehle",
        "Deepens slow-wave sleep and controls nighttime cortisol, ensuring hormonal fat balance",
        "Gungune paani ke sath sone se pehle lein."
    ),
    (
        "Curcumin C3 Complex with BioPerine (500mg)",
        "Curcumin Anti-Inflammatory Adipose Shield",
        "1 capsule with meals",
        3, 0.0, 0.6, 0.0,
        "Lunch ke sath",
        "Downregulates inflammatory cytokines in adipose fat tissue, facilitating steady weight loss",
        "Khane ke sath 1 capsule consume karein."
    ),
    (
        "Organic Spirulina & Chlorella Tablets (1000mg)",
        "Organic Spirulina Micronutrient Superfood",
        "2 tablets with water",
        8, 1.2, 0.6, 0.1,
        "Morning pre-breakfast",
        "Loaded with chlorophyll, bio-iron and minerals to avoid deficiencies on a calorie budget",
        "Subah paani ke sath do tablets lein."
    ),
    (
        "100% Pure Whey Protein Blend (Concentrate/Isolate 24g)",
        "Pure Whey Daily Satiety Protein Shake",
        "1 scoop (32g) in 250ml water",
        120, 24.0, 2.0, 1.5,
        "Breakfast ya 4 PM snack",
        "Highest biological value protein keeping appetite calm and muscular shape firm",
        "Shaker mein paani ya toned doodh ke sath shake karein."
    ),
    (
        "Apple Cider Vinegar with Mother & Chromium Softgels",
        "ACV & Chromium Sugar Craving Softgels",
        "2 softgels before meals",
        5, 0.0, 1.0, 0.0,
        "Lunch se 15 min pehle",
        "Synergistic acetic acid and chromium picolinate blunting post-meal insulin surges",
        "Khane se pehle 1 glass paani ke sath lein."
    ),
    (
        "Ashwagandha KSM-66 Stress & Cortisol Reducer (500mg)",
        "Ashwagandha Stress & Cortisol Balance",
        "1 veg capsule daily",
        4, 0.1, 0.8, 0.0,
        "Raat ko sone se pehle",
        "Clinically shown to lower emotional stress-eating and stubborn waistline circumference",
        "Sone se pehle gungune paani ya doodh ke sath lein."
    )
]

# 14 Serving Modes for 15 Supplements = 15 * 14 = 210 Supplement Items
WEIGHT_LOSS_SUPP_MODS = [
    ("in Chilled Water", "Thande Paani mein", 1.0, "Standard chilled water dilution."),
    ("in Fresh Coconut Water", "Taaza Nariyal Paani mein", 1.35, "Electrolyte-rich coconut water suspension."),
    ("with Squeeze of Fresh Lemon", "Taaza Nimbu ke Sath", 1.02, "Vitamin C bio-enhancement."),
    ("in Room Temperature Water", "Sadharan Paani mein", 1.0, "Rapid absorption room temperature hydration."),
    ("with 1 Spoon Chia Seeds", "1 Chammach Chia Beej ke Sath", 1.15, "Soluble fiber suspension for extended fullness."),
    ("with Pinch of Pink Himalayan Salt", "Sendha Namak ke Sath", 1.01, "Electrolyte retention during caloric deficits."),
    ("in Mint Infused Water", "Pudina Paani mein", 1.01, "Cooling digestive hydration."),
    ("in Warm Water", "Gungune Paani mein", 1.0, "Rapid gastric dissipation in warm water."),
    ("in Low-Fat Skimmed Milk", "Skimmed Doodh mein", 1.35, "Added casein peptide satiety matrix."),
    ("with Submerged Ice Cubes", "Baraf ke Tukdon ke Sath", 1.0, "Cold thermoregulatory refreshment."),
    ("with 1 Cup Warm Green Tea", "Garam Green Tea ke Sath", 1.02, "Dual catechin metabolic synergy."),
    ("with Sliced Cucumber Water", "Kheera Paani ke Sath", 1.02, "Alkalizing fluid balance."),
    ("with 1 Spoon Organic Honey", "1 Chammach Shehad ke Sath", 1.2, "Clean natural energy carrier."),
    ("in Fresh Mosambi Juice", "Taaza Mosambi Juice mein", 1.4, "Citrus pectin fruit infusion.")
]
