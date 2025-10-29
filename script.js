// Longevity Food Score Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const calculatorForm = document.getElementById('calculatorForm');
    const resultsSection = document.getElementById('resultsSection');
    const scoreValue = document.getElementById('scoreValue');
    const scoreText = document.getElementById('scoreText');
    const recommendationsList = document.getElementById('recommendationsList');
    const userScore = document.getElementById('userScore');
    const userBar = document.getElementById('userBar');
    
    // Food scoring data
    const foodCategories = [
        { name: 'beans', maxScore: 20, ideal: '4+ servings/week' },
        { name: 'grains', maxScore: 20, ideal: '3+ servings/day' },
        { name: 'nuts', maxScore: 20, ideal: '3+ oz servings/week' },
        { name: 'fruits', maxScore: 20, ideal: 'Daily variety' },
        { name: 'fish', maxScore: 20, ideal: '2-3 servings/week' }
    ];
    
    // Recommendation messages
    const recommendations = {
        beans: [
            "Add beans to breakfast scrambles or salads 3+ times weekly",
            "Try lentil soup or chickpea curry for dinner twice a week",
            "Replace half the meat in recipes with beans or lentils"
        ],
        grains: [
            "Swap white bread/bagels for whole grain versions",
            "Choose brown rice or quinoa instead of white rice",
            "Start your day with oatmeal or whole grain cereal"
        ],
        nuts: [
            "Keep nuts at your desk for healthy snacking",
            "Add walnuts or almonds to your morning oatmeal",
            "Use nut butters on whole grain toast or apple slices"
        ],
        fruits: [
            "Add berries to your breakfast routine",
            "Keep cut fruit visible for easy snacking",
            "Blend frozen berries into smoothies"
        ],
        fish: [
            "Plan 2 fish-based meals each week",
            "Try canned salmon or tuna for quick lunches",
            "Experiment with different fish preparation methods"
        ]
    };
    
    // Calculate score function
    calculateBtn.addEventListener('click', function() {
        let totalScore = 0;
        let selectedCategories = [];
        
        foodCategories.forEach(category => {
            const selectedOption = document.querySelector(`input[name="${category.name}"]:checked`);
            if (selectedOption) {
                const points = parseInt(selectedOption.value);
                const categoryScore = (points / 4) * category.maxScore;
                totalScore += categoryScore;
                
                // Track low-scoring categories for recommendations
                if (points <= 2) {
                    selectedCategories.push(category.name);
                }
            }
        });
        
        // Ensure score is between 0-100
        totalScore = Math.min(Math.max(totalScore, 0), 100);
        
        // Update score display
        scoreValue.textContent = Math.round(totalScore);
        userScore.textContent = Math.round(totalScore);
        
        // Update score text based on range
        if (totalScore >= 80) {
            scoreText.textContent = "Excellent! You're on the right track";
        } else if (totalScore >= 60) {
            scoreText.textContent = "Good! Some improvements possible";
        } else if (totalScore >= 40) {
            scoreText.textContent = "Fair! Room for meaningful changes";
        } else {
            scoreText.textContent = "Needs work! Focus on key areas";
        }
        
        // Update comparison chart
        userBar.style.width = `${totalScore}%`;
        
        // Generate recommendations
        recommendationsList.innerHTML = '';
        if (selectedCategories.length > 0) {
            selectedCategories.forEach(category => {
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
                const recs = recommendations[category];
                
                const recItem = document.createElement('div');
                recItem.className = 'recommendation-item';
                
                const randomRec = recs[Math.floor(Math.random() * recs.length)];
                
                recItem.innerHTML = `
                    <h4>Improve Your ${categoryName} Intake</h4>
                    <p>${randomRec}</p>
                `;
                
                recommendationsList.appendChild(recItem);
            });
        } else {
            recommendationsList.innerHTML = `
                <div class="recommendation-item">
                    <h4>Maintain Your Excellent Habits</h4>
                    <p>Continue with your current eating patterns and consider exploring new longevity foods like fermented foods or green tea.</p>
                </div>
            `;
        }
        
        // Show results section
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
});
