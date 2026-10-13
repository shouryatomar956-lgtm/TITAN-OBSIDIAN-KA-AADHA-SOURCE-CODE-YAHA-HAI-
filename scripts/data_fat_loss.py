"""
Fat Loss Database Base Definitions
70% Indian Home Foods (560 items: 35 base dishes x 16 accompaniments)
30% Gym Supplements (240 items: 15 base supplements x 16 serving modes)
Total: 800 items
Focus: Caloric restriction without lean mass catabolism, high TEF, volumetric low-calorie density, high dietary fiber satiety.
"""

FAT_LOSS_HOME_BASE = [
    # 1. Volumetric Low-Calorie Soups & Alkalizing Greens (Extreme Satiety, Minimal Calories)
    (
        "Warm Lauki (Bottle Gourd) & Cumin Clear Soup",
        "Garam Lauki Jeera Soup",
        "1 big bowl (300ml)",
        45, 1.5, 7.5, 0.4,
        "Lunch ya dinner se 20 min pehle",
        "Volumetric high-water fiber expands stomach to naturally cut meal portions by 30%",
        "Taaza lauki, tamatar aur jeera ubaal kar blend karein aur gunguna piyein."
    ),
    (
        "Steamed Broccoli, Carrot & Capsicum Crunch Bowl",
        "Bhaap Broccoli Gajar Shimla Mirch",
        "1 large bowl (200g)",
        65, 3.8, 11.0, 0.5,
        "Salad ke roop mein lunch ya dinner ke sath",
        "High dietary insoluble fiber and micronutrients requiring more energy to digest (High TEF)",
        "Broccoli, gajar aur shimla mirch ko 5 min steam karein aur halka nimbu nichodein."
    ),
    (
        "Vegetable Clear Soup with Cabbage, Carrots & Mint",
        "Patta Gobhi Gajar Clear Soup",
        "1 big bowl (300ml)",
        50, 2.0, 9.0, 0.3,
        "Evening hunger cravings ya dinner se pehle",
        "Fills stomach capacity with near-zero calories, curbing snacking temptations",
        "Barik kati patta gobhi, gajar aur pudina ko ubaal kar halki kali mirch ke sath lein."
    ),
    (
        "Steamed Cabbage (Patta Gobhi) & Green Peas Sabzi",
        "Patta Gobhi Matar ki Sukhi Sabzi",
        "1 bowl (180g)",
        95, 3.5, 16.0, 1.8,
        "Lunch mein roti ya dal ke sath",
        "Glucosinolates and high volume fiber keep you full for 3+ hours",
        "Patta gobhi aur matar ko bina jyada tel ke jeera tadka mein paka lein."
    ),
    (
        "Cucumber, Tomato, Radish & Beetroot Crunch Salad",
        "Kheera Tamatar Mooli Chukandar Salad",
        "1 large plate (250g)",
        55, 2.2, 11.0, 0.4,
        "Khane se 15 min pehle",
        "Pre-loads digestive tract with raw enzymes and dietary bulk to prevent overeating",
        "Kheera, tamatar, mooli aur chukandar ke slices par taaza nimbu dalein."
    ),

    # 2. High TEF Lean Proteins (Protects Lean Muscle while Burning Fat)
    (
        "Egg White Scramble (4 Whites) with Tomatoes & Onions",
        "4 Ande ki Safedi ki Bhurji Tamatar ke Sath",
        "1 plate (150g)",
        95, 18.0, 3.5, 0.5,
        "Breakfast ya evening post-workout",
        "Pure protein with 30% Thermic Effect of Food (TEF) burning extra calories during digestion",
        "4 ando ki safedi ko tamatar, pyaz aur hari mirch ke sath non-stick pan mein banayein."
    ),
    (
        "Boiled Whole Eggs & Whites (1 Whole + 3 Whites)",
        "Uble Ande (1 Pura + 3 Safedi)",
        "4 eggs (1 whole + 3 whites)",
        140, 20.0, 1.0, 5.5,
        "Breakfast ya post-workout",
        "Optimal balance of essential choline, albumin protein and sustained fullness",
        "Ando ko 10 min ubaal kar chheel lein aur taaza nimbu ke sath khayein."
    ),
    (
        "Tawa Grilled Low-Fat Paneer Tikka with Mint Chutney",
        "Low-Fat Paneer Tikka Pudina Chutney",
        "150g low-fat paneer",
        185, 25.0, 4.0, 7.5,
        "Evening snack ya lunch protein",
        "Casein peptide matrix digests slowly over 5 hours, eliminating hunger pangs",
        "Low-fat paneer ko dahi, haldi aur ajwain mein marinate karke tawa par sekein."
    ),
    (
        "Shredded Boiled Chicken Breast Salad with Lime & Mint",
        "Ubla Chicken Breast Salad Nimbu Pudina",
        "1 bowl (150g)",
        170, 38.0, 1.0, 1.8,
        "Lunch ya dinner mein",
        "Ultra-lean poultry with maximum protein-to-calorie ratio, sparing lean muscle mass",
        "Chicken breast ko ubaal kar shred karein, kheera aur taaza nimbu mix karein."
    ),
    (
        "Tawa Grilled Rohu Fish Tikka with Ajwain & Lemon",
        "Tawa Rohu Machhli Tikka Ajwain Nimbu",
        "150g fish fillet",
        155, 28.0, 1.5, 3.8,
        "Lunch ya dinner protein",
        "Lean aquatic protein packed with omega-3 fatty acids that support fat mobilization",
        "Machhli fillet ko ajwain aur nimbu ke sath tawa par halka grill karein."
    ),
    (
        "Steamed Soya Chunks & French Beans Salad",
        "Bhaap Soya Chunks Beans Salad",
        "1 bowl (140g)",
        150, 22.0, 10.0, 1.5,
        "Post-workout ya midday snack",
        "High plant protein density coupled with green bean fiber for intense satiety",
        "Soya chunks ubaal kar nichodein, uble beans aur nimbu ke sath mix karein."
    ),
    (
        "Light Moong Dal Soup with Garlic & Coriander",
        "Patli Moong Dal Soup Lehsun Dhaniya",
        "1 big bowl (250ml)",
        105, 7.5, 17.0, 0.8,
        "Dinner ya pre-lunch appetizer",
        "Easily digestible plant protein and potassium that drains excess water retention",
        "Dhuli moong dal ko patla ubaal kar lehsun aur jeera ka halka chhonk lagayein."
    ),

    # 3. High Fiber Legumes, Sprouted Seeds & Gut Regulators
    (
        "Sprouted Moong Dal Salad with Cucumber & Lemon",
        "Ankurit Moong Salad Kheera Nimbu",
        "1 bowl (150g)",
        120, 9.0, 20.0, 0.8,
        "Morning breakfast ya 4 PM snack",
        "Active enzymes and soluble fiber that slows gastric emptying and curbs appetite",
        "Ankurit moong mein kheera, tamatar aur taaza nimbu nichod kar khayein."
    ),
    (
        "Sprouted Kala Chana with Ginger Slices & Green Chilli",
        "Ankurit Kala Chana Adrak Hari Mirch",
        "1 bowl (120g)",
        140, 9.0, 22.0, 1.8,
        "Morning pre-breakfast fuel",
        "Slow-digesting resistant starch feeds gut microbiome and sustains fullness",
        "Ankurit chana ko adrak ke bareek lachhon aur nimbu ke sath lein."
    ),
    (
        "Boiled Rajma (Red Kidney Beans) & Onion Salad",
        "Ubla Rajma Pyaz Salad Nimbu ke Sath",
        "1 bowl (150g)",
        155, 9.5, 27.0, 0.8,
        "Lunch staple for fat loss",
        "Dense resistant starch and soluble fiber that reduces visceral abdominal fat",
        "Bheege rajma ko ubaal kar pyaz, tamatar aur nimbu ke sath mix karein."
    ),
    (
        "Roasted Desi Chana with Husk (Chhilke Wala Bhuna Chana)",
        "Chhilke Wala Bhuna Chana Snack",
        "1 handful (45g)",
        155, 8.5, 25.0, 2.2,
        "Evening tea time hunger savior",
        "Outer husk provides high insoluble fiber preventing insulin spikes and hunger",
        "Ghar ka bhuna chana bina namak ya halka sendha namak ke sath chabayein."
    ),
    (
        "Roasted Makhana (Fox Nuts) with Light Haldi (No Fat)",
        "Dry Roasted Makhana Haldi ke Sath",
        "1 big bowl (35g)",
        120, 3.2, 23.0, 0.4,
        "4 PM crunchy snack",
        "Extremely low calorie density allows you to eat a large volume without guilt",
        "Makhana ko bina tel/ghee ke sukha tawa par roast karein, halki haldi dalein."
    ),

    # 4. Soluble Fiber Grains & Smart Carb Portions
    (
        "Rolled Oats Vegetable Khichdi with Carrots & Beans",
        "Oats Sabzi Khichdi Gajar Beans",
        "1 deep bowl (200g)",
        160, 6.0, 29.0, 2.2,
        "Breakfast ya light dinner",
        "Beta-glucan soluble fiber forms a gel in gut, blunting post-meal sugar spikes",
        "Rolled oats ko gajar, matar aur jeera tadka ke sath khichdi banayein."
    ),
    (
        "Broken Wheat Daliya with Spinach & Moong Dal",
        "Dalia Palak Moong Dal Khichdi",
        "1 bowl (200g)",
        170, 7.5, 32.0, 1.8,
        "Lunch ya dinner",
        "High grain fiber with iron-rich spinach for sustained fullness on low calories",
        "Gehu ka dalia, palak aur moong dal ko cooker mein paka lein."
    ),
    (
        "Thin Moong Dal Chilla (1 Chilla) with Green Mint Chutney",
        "1 Patla Moong Dal Chilla Pudina Chutney",
        "1 chilla (80g)",
        110, 7.0, 15.0, 2.2,
        "Breakfast ya light dinner",
        "Low glycemic savory crepe with zero refined flour, supporting fat metabolism",
        "Pisi moong dal ka patla ghol bana kar non-stick tawa par sekhein."
    ),
    (
        "Methi (Fenugreek) Whole Wheat Phulka (1 Roti) with Curd",
        "1 Methi Phulka Taaza Dahi ke Sath",
        "1 roti + 1/2 cup curd",
        150, 5.5, 24.0, 3.5,
        "Lunch staple",
        "Fenugreek galactomannan fiber delays digestion while curd offers probiotic satiety",
        "Aate mein taaza methi gundh kar patla phulka sekhein aur dahi ke sath lein."
    ),
    (
        "Steamed Rice & Dal Idlis (2 Small Idlis) with Sambar",
        "2 Bhaap Idli Patla Sambar",
        "2 small idlis + sambar (160g)",
        140, 5.0, 28.0, 1.2,
        "Morning breakfast",
        "Light fermented meal that is effortless on digestion while providing clean carbs",
        "Bhaap mein paki idli ko bina nariyal chutney ke patle daal sambar ke sath lein."
    ),

    # 5. Low Glycemic High-Water Fruits (Sweet Tooth Craving Killers)
    (
        "Fresh Papaya (Papita) Cubes Bowl",
        "Taaza Papita Cubes Bowl",
        "1 large bowl (200g)",
        75, 1.2, 18.0, 0.3,
        "Mid-morning ya evening snack",
        "Papain enzyme enhances protein breakdown and high water content flushes bloat",
        "Taaza paka papita kaat kar thanda khayein."
    ),
    (
        "Fresh Watermelon (Tarbooz) Cubes with Mint",
        "Taaza Tarbooz Pudina ke Sath",
        "1 large bowl (250g)",
        75, 1.5, 18.0, 0.4,
        "Afternoon hydration snack",
        "92% water volume fills stomach completely with only 75 calories per big bowl",
        "Tarbooz ke cubes kaat kar taaza pudina ke patte daal kar lein."
    ),
    (
        "Fresh Guava (Amrood) Slices with Rock Salt & Mint",
        "Taaza Amrood Sendha Namak Pudina",
        "1 large guava (150g)",
        80, 2.5, 16.0, 1.0,
        "Mid-day hunger stopper",
        "One of the highest fiber fruits (9g fiber) with very low glycemic index",
        "Amrood ko kaat kar sendha namak ke sath chaba kar khayein."
    ),
    (
        "Green Apple Slices Dusted with Ceylon Cinnamon",
        "Hara Seb Dalchini Powder ke Sath",
        "1 medium apple (130g)",
        65, 0.5, 16.0, 0.2,
        "Pre-workout ya sweet craving stopper",
        "Cinnamon improves insulin sensitivity while tart malic acid curbs appetite",
        "Hare seb ke slices par thoda dalchini powder chhidak kar lein."
    ),
    (
        "Fresh Mosambi (Sweet Lime) Slices with Fibre Pulp",
        "Taaza Mosambi Pulp sahit Fankein",
        "2 mosambis (200g)",
        85, 1.5, 20.0, 0.3,
        "Workout se 45 min pehle",
        "Whole citrus with intact fiber provides steady hydration without sugar spikes",
        "Mosambi ko chheel kar bina chhane fankein pulp sahit khayein."
    ),

    # 6. Detoxifying & Metabolic Hydrators (Anti-Bloat, Fat Oxidation)
    (
        "Chilled Spiced Chaas (Skimmed Buttermilk) with Jeera",
        "Thandi Masala Chaas Bhuna Jeera",
        "1 large glass (300ml)",
        50, 4.0, 6.0, 0.8,
        "After lunch ya midday",
        "Probiotics and lactic acids calm gut inflammation and accelerate fat metabolism",
        "Malaai-rahit dahi ko thande paani, bhuna jeera aur pudina ke sath churn karein."
    ),
    (
        "Chia Seed & Fresh Lemon Hydration Gel Drink",
        "Chia Beej Nimbu Detox Drink",
        "1 large glass (300ml)",
        55, 2.0, 7.5, 2.2,
        "Subah khali pet ya meal se 30 min pehle",
        "Chia fiber absorbs 12x its weight in water, expanding inside gut for deep fullness",
        "1 chammach chia beej 20 min paani mein bhigoye aur taaza nimbu nichodein."
    ),
    (
        "Warm Apple Cider Vinegar & Ginger Detox Water",
        "Seb ka Sirka Gunguna Adrak Paani",
        "1 large glass (250ml)",
        15, 0.1, 2.5, 0.0,
        "Meal se 15 min pehle",
        "Acetic acid lowers post-meal glycemic response and activates fat burning enzymes",
        "1 chamach apple cider vinegar aur adrak ka ras gungune paani mein milayein."
    ),
    (
        "Fresh Amla & Mint Juice with Pure Water",
        "Taaza Amla Pudina Paani Juice",
        "1 glass (200ml)",
        35, 0.6, 7.5, 0.1,
        "Subah khali pet",
        "Dense vitamin C supports carnitine synthesis in liver for efficient fat breakdown",
        "Do taaza amla aur pudina ko blend karke chhaanein aur piyein."
    ),
    (
        "Organic Green Tea Brewed with Fresh Ginger & Lemon",
        "Taaza Green Tea Adrak Nimbu ke Sath",
        "1 large mug (250ml)",
        5, 0.2, 1.0, 0.0,
        "Subah ya workout se 30 min pehle",
        "EGCG catechins boost 24-hour resting energy expenditure and fat oxidation",
        "Green tea leaves ko 3 min garam paani mein brew karein, nimbu nichodein."
    ),
    (
        "Sattu & Mint Slimming Drink (Light Saline Formulation)",
        "Sattu Pudina Halka Slimming Sharbat",
        "1 tall glass (300ml)",
        135, 8.5, 21.0, 1.8,
        "Breakfast replacement ya 4 PM snack",
        "Clean roasted gram protein and prebiotic fiber keeps belly satisfied for hours",
        "2 chamach sattu thande paani, pudina aur taaza nimbu mein gholein."
    ),
    (
        "Karela (Bitter Gourd) & Onion Stir Fry with Jeera",
        "Karela Pyaz Halka Stir Fry",
        "1 bowl (140g)",
        85, 2.5, 12.0, 2.5,
        "Lunch mein roti ya dal ke sath",
        "Charantin and polypeptide-p mimic insulin, driving carbs into muscle not fat",
        "Karela ko kaat kar pyaz aur jeera ke sath kam tel mein tawa par banayein."
    ),
    (
        "Baingan ka Bharta (Smoked Eggplant) with Tomatoes & Peas",
        "Bhuna Baingan Bharta Tamatar Matar",
        "1 bowl (180g)",
        110, 3.2, 16.0, 3.5,
        "Dinner ya lunch",
        "High dietary volume with rich anthocyanin antioxidants supporting metabolic health",
        "Baingan ko gas par bhun kar chheelein, tamatar aur matar ke sath sauté karein."
    )
]

# 16 Authentic Accompaniments/Portion Variations for 35 Dishes = 35 * 16 = 560 Home Items
FAT_LOSS_HOME_MODS = [
    ("(Standard Fat Loss Portion)", "(Standard Portion)", 1.0, "Standard caloric deficit portion."),
    ("(High Protein Lean Double Portion)", "(Double Lean Portion)", 1.35, "High protein satiety portion for heavy deficit days."),
    ("(Ultra-Lean Light Serving)", "(Ultra-Light Serving)", 1.1, "Calibrated light deficit serving."),
    ("with 1 Glass Spiced Buttermilk (Chaas)", "1 Glass Masala Chaas ke Sath", 1.12, "Probiotic hydration and protein satiety with minimal calories."),
    ("with Fresh Mint & Coriander Chutney", "Pudina Dhaniya Chutney ke Sath", 1.02, "Herbal digestive enzymes stimulating thermogenic digestion."),
    ("with 1 Bowl Raw Cucumber & Tomato Salad", "Kheera Tamatar Salad ke Sath", 1.05, "Water-rich crunch expanding stomach volume with near-zero calories."),
    ("with Squeeze of Fresh Lemon", "Taaza Nimbu ke Sath", 1.01, "Vitamin C bio-enhancer stimulating carnitine fat oxidation."),
    ("with 1 Cup Warm Green Tea", "1 Cup Garam Green Tea ke Sath", 1.02, "EGCG catechins enhancing post-meal metabolic rate."),
    ("with Handful of Steamed Moong Sprouts", "Bhaap Moong Sprouts ke Sath", 1.18, "Live plant enzymes and low-calorie fiber boost."),
    ("with 2 Boiled Egg Whites", "2 Uble Ande ki Safedi ke Sath", 1.25, "Pure albumin protein to keep muscle mass firm on a deficit."),
    ("with 1 Spoon Roasted Chia Seeds", "1 Chammach Bhune Chia Beej ke Sath", 1.1, "Soluble fiber gel prolonging fullness and stable insulin."),
    ("with Warm Ginger & Lemon Water", "Garam Adrak Nimbu Paani ke Sath", 1.01, "Thermogenic gingerol accelerating resting calorie burn."),
    ("with Sliced Radish (Mooli) Crunch", "Mooli ke Slices ke Sath", 1.03, "High-fiber digestive root that aids liver bile and fat clearance."),
    ("with 1 Cup Clear Vegetable Broth", "1 Cup Sabzi Broth ke Sath", 1.06, "Warm savory liquid filling stomach capacity before meals."),
    ("with Fresh Papaya Cubes (Small Cup)", "Taaza Papita ke Sath", 1.12, "Digestive papain enzyme aiding gut clearance and bloat removal."),
    ("with Mint Infused Iced Water", "Pudina Baraf Paani ke Sath", 1.0, "Zero-calorie refreshing hydration blunting false hunger signals.")
]

FAT_LOSS_SUPPS_BASE = [
    (
        "L-Carnitine L-Tartrate Fast-Acting Liquid (3000mg)",
        "L-Carnitine Liquid Fat Mobilizer Shot",
        "1 tablespoon (15ml)",
        10, 0.0, 2.5, 0.0,
        "Workout se 20-30 min pehle",
        "Shuttles circulating long-chain fatty acids into mitochondria to be burned as aerobic fuel",
        "Direct 1 chamach piyein ya thode paani mein mix karein."
    ),
    (
        "Green Tea Extract EGCG High Potency (500mg)",
        "Green Tea Extract Thermogenic Capsule",
        "1 veg capsule",
        4, 0.1, 0.8, 0.0,
        "Morning breakfast ke sath ya pre-workout",
        "Clinical dose of EGCG catechins that boosts resting metabolic rate and fat oxidation",
        "Paani ke sath 1 capsule subah lein."
    ),
    (
        "Conjugated Linoleic Acid Pure CLA (1000mg Softgel)",
        "CLA Lean Body Toning Softgel",
        "1 softgel with meals",
        9, 0.0, 0.0, 1.0,
        "Lunch ya dinner ke sath",
        "Inhibits lipoprotein lipase enzyme, reducing fat storage while preserving lean muscle",
        "Khane ke dauran paani ke sath 1 softgel lein."
    ),
    (
        "100% Whey Protein Isolate (Zero Carb 25g Protein)",
        "Zero Carb Whey Isolate Shake",
        "1 scoop (30g) in 250ml water",
        110, 26.0, 0.5, 0.2,
        "Post-workout ya breakfast meal",
        "Highest biological value protein sparing muscle tissue under severe caloric deficits",
        "Thande paani mein shaker mein 20 second shake karein aur piyein."
    ),
    (
        "Micellar Casein Night-Time Protein (25g Protein)",
        "Micellar Casein Anti-Catabolic Shake",
        "1 scoop (32g) in 300ml water",
        120, 25.0, 1.5, 0.8,
        "Bedtime ya prolonged fasting se pehle",
        "Slow 7-hour amino acid release prevents midnight hunger and muscle breakdown",
        "Thande paani mein ghol kar sone se aadha ghanta pehle lein."
    ),
    (
        "Organic Glucomannan (Konjac Root Fiber 1000mg)",
        "Glucomannan Appetite Suppressor Capsule",
        "2 capsules with 2 big glasses of water",
        5, 0.0, 1.2, 0.0,
        "Heavy meal se 30-45 min pehle",
        "Absorbs 50x its weight in water, creating deep natural fullness to curb overeating",
        "2 bade glass paani ke sath do capsules nigalein."
    ),
    (
        "Caffeine Anhydrous & L-Theanine Focus Matrix (100/200mg)",
        "Clean Energy Metabolic Focus Capsule",
        "1 capsule",
        0, 0.0, 0.0, 0.0,
        "Workout se 30 min pehle",
        "Mobilizes free fatty acids for energy while smoothing out jitters and hunger spikes",
        "Paani ke sath lein pre-workout."
    ),
    (
        "Apple Cider Vinegar with Mother (1000mg Organic ACV)",
        "ACV Raw Mother Extract Capsule",
        "2 capsules with water",
        5, 0.0, 1.0, 0.0,
        "Lunch ya dinner se 20 min pehle",
        "Blunts postprandial glucose spike, reducing insulin secretion and fat storage",
        "Khane se pehle 1 glass paani ke sath lein."
    ),
    (
        "Pure Berberine HCl Extract (500mg GDA)",
        "Berberine Glucose Disposal Agent Capsule",
        "1 capsule before carbohydrate meal",
        4, 0.1, 0.8, 0.0,
        "Carb meal se 15 min pehle",
        "Activates AMPK metabolic pathway, partitioning dietary carbs into muscle not fat",
        "Khane ke sath 1 capsule lein."
    ),
    (
        "Chromium Picolinate Essential Mineral (200mcg)",
        "Chromium Sugar Craving Blocker Tablet",
        "1 tablet daily",
        0, 0.0, 0.0, 0.0,
        "Breakfast ke sath",
        "Optimizes cellular insulin sensitivity, stopping mid-afternoon sweet and carb cravings",
        "Subah nashte ke sath paani se lein."
    ),
    (
        "Cayenne Pepper Extract (Capsimax Beadlets 100mg)",
        "Capsimax Thermogenic Calorie Burner",
        "1 capsule with breakfast",
        3, 0.1, 0.6, 0.0,
        "Subah breakfast ke sath",
        "Increases body core temperature, accelerating natural caloric burn without stomach burn",
        "Nashte ke sath paani se 1 capsule lein."
    ),
    (
        "Ashwagandha KSM-66 Full Root Extract (600mg)",
        "Ashwagandha Cortisol & Belly Fat Reducer",
        "1 veg capsule",
        5, 0.2, 0.9, 0.0,
        "Raat ko sone se pehle",
        "Lowers stress hormone cortisol which directly triggers abdominal visceral fat storage",
        "Gungune paani ke sath sone se pehle lein."
    ),
    (
        "Plant Pea & Brown Rice Isolate (Zero Sugar 24g)",
        "Plant-Based Lean Protein Shake",
        "1 scoop (30g) in 300ml water",
        115, 24.0, 1.2, 0.5,
        "Post-workout ya meal replacement",
        "Dairy-free, hypoallergenic lean protein keeping metabolism active and gut light",
        "Thande paani mein shake karke consume karein."
    ),
    (
        "Synephrine Citrus Aurantium Extract (30mg)",
        "Synephrine Natural Fat Oxidizer Capsule",
        "1 capsule pre-workout",
        2, 0.0, 0.5, 0.0,
        "Morning pre-cardio",
        "Stimulates beta-3 adrenergic receptors, selectively mobilizing stored body fat",
        "Cardio workout se 30 min pehle paani ke sath lein."
    ),
    (
        "Electrolyte Sugar-Free Fasting Matrix (Zero Calorie)",
        "Zero-Sugar Fasting Hydration Powder",
        "1 scoop (5g) in 500ml water",
        5, 0.0, 0.5, 0.0,
        "Intermittent fasting window ya workout",
        "Replenishes critical sodium, potassium and magnesium preventing fasting headaches",
        "500ml shaker mein gholein aur ghut-ghut piyein."
    )
]

# 16 Serving Modes for 15 Supplements = 15 * 16 = 240 Supplement Items
FAT_LOSS_SUPP_MODS = [
    ("in Chilled Water", "Thande Paani mein", 1.0, "Standard chilled water dilution."),
    ("with Squeeze of Fresh Lemon", "Taaza Nimbu ke Sath", 1.02, "Vitamin C bio-activation matrix."),
    ("in Room Temperature Water", "Sadharan Paani mein", 1.0, "Rapid absorption room temperature hydration."),
    ("with 1 Spoon Organic Apple Cider Vinegar", "1 Chammach ACV ke Sath", 1.05, "Synergistic acetic acid glycemic control."),
    ("with Pinch of Pink Himalayan Salt", "Sendha Namak ke Sath", 1.01, "Electrolyte retention during caloric deficits."),
    ("in Mint Infused Iced Water", "Pudina Baraf Paani mein", 1.01, "Cooling appetite-suppressing hydration."),
    ("with Chia Seed Gel Infusion", "Chia Seed Paani ke Sath", 1.15, "Soluble fiber suspension delaying gastric transit."),
    ("in Warm Water", "Gungune Paani mein", 1.0, "Rapid dissipation in warm water."),
    ("in Low-Fat Skimmed Milk", "Skimmed Doodh mein", 1.35, "Added casein protein satiety matrix."),
    ("with Submerged Ice Cubes", "Baraf ke Tukdon ke Sath", 1.0, "Cold thermoregulatory performance drink."),
    ("with 1 Cup Warm Green Tea", "Garam Green Tea ke Sath", 1.02, "Dual catechin thermogenic synergy."),
    ("with Ceylon Cinnamon Powder", "Dalchini Powder ke Sath", 1.02, "Insulin sensitization and glucose blunting."),
    ("in Fresh Cucumber Mint Water", "Kheera Pudina Paani mein", 1.02, "Alkalizing cellular fluid balance."),
    ("with 1 Spoon Psyllium Husk (Isabgol)", "Isabgol Bhusi ke Sath", 1.15, "Maximum volume gut expansion fiber matrix."),
    ("in Crushed Ice Slush", "Baraf Slush mein", 1.0, "Crisp refreshing zero-calorie deficit slush."),
    ("with Amla & Lemon Extract Drop", "Amla Nimbu ke Sath", 1.02, "Natural liver antioxidant support.")
]
