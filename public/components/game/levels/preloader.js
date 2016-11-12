module.exports = (function() {
    
    let state = function() {
        
    }
    
    state.prototype = {
        
        init: function() {
            this.scale.pageAlignHorizontally = true;
        },
        
        create: function() {
            this.game.levels.startNext();
        }
        
    };
    
    return state;
    
})();