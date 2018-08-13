new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        isSpecialAttackAvailable: true,
        turns: []
    },
    watch: {
        playerHealth: function() {
            if ((Math.random() * 10) > 5) {
                this.isSpecialAttackAvailable = true;
            } else {
                this.isSpecialAttackAvailable = false;
            }
            console.log((Math.random() * 10));
        }
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.isSpecialAttackAvailable = true;
            this.turns = [];
        },
        attack: function() {
            const damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            if (this.checkWin()) {
                return;
            }
            this.logPlayerAction('attack', damage);
            this.monsterDealDamage()
        },
        specialAttack: function() {
            const damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.isSpecialAttackAvailable = false;
            this.logPlayerAction('specialAttack', damage);
            if (this.checkWin()) {
                return;
            }
            this.monsterDealDamage()
        },
        heal: function() {
            const prevHealth = this.playerHealth;
            if (this.playerHealth <= 10) {
                this.playerHealth += 25;
            } else if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                playerHealth = 100;
            }
            const healedFor = this.playerHealth - prevHealth;
            this.logPlayerAction('heal', healedFor);
            this.monsterDealDamage();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterDealDamage() {
            const damage = this.calculateDamage(8, 14)
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                message: 'Monster hits Player for ' + damage
            })

            this.checkWin();
        },
        logPlayerAction: function(action, value) {
            if (action === 'attack') {
                this.turns.unshift({
                    isPlayer: true,
                    message: 'Player hits Monster for ' + value
                })    
            } else if (action === 'specialAttack') {
                this.turns.unshift({
                    isPlayer: true,
                    message: 'Player hits with SPECIAL ATTACK Monster for ' + value
                })    
            } else if (action === 'heal'){
                this.turns.unshift({
                    isPlayer: true,
                    message: 'Player heals for ' + value
                }) 
            }
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if(confirm('You won! New game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! New game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true; 
            }
            return false;

        }
    }
});