// Simple Scoreboard stored in localStorage
const Scoreboard = {
    scores: {},

    load() {
        const saved = localStorage.getItem('scores');
        if (saved) {
            try {
                this.scores = JSON.parse(saved);
            } catch (e) {
                this.scores = {};
            }
        }
    },

    save() {
        localStorage.setItem('scores', JSON.stringify(this.scores));
    },

    addScore(challenge, value = 1) {
        if (!this.scores[challenge]) {
            this.scores[challenge] = 0;
        }
        this.scores[challenge] += value;
        this.save();
    },

    getScore(challenge) {
        return this.scores[challenge] || 0;
    },

    getAllScores() {
        return this.scores;
    }
};

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => Scoreboard.load());
    window.Scoreboard = Scoreboard;
}

if (typeof module !== 'undefined') {
    module.exports = Scoreboard;
}
