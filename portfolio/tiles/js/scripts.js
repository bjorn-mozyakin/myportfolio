$(document).ready(function(){



  Array.prototype.shuffle = function( b )
  {
   var i = this.length, j, t;
   while( i )
   {
    j = Math.floor( ( i-- ) * Math.random() );
    t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
    this[i] = this[j];
    this[j] = t;
   }

   return this;
  };








// class BtnPlay
  function BtnPlay(options) {
    this.elem = options.elem;
    this.elem.onclick = this.onclick.bind(this);
  }

  BtnPlay.prototype.onclick = function() {
    this.defineGameParams();
    this.changeScreen();
    this.createTiles();
  }

  BtnPlay.prototype.defineGameParams = function() {
    tile_type = tile_type || $('.tile_type').val()
    tile_amount = tile_amount || $('.tile_amount').val()


    switch(tile_type) {
      case "animals":
        tile_elems = ['dog','cat','mouse','hare','bear','snake','lion','duck','cow','goat'];
        break;
      case "food":
      default:
        tile_elems = ['apple','pear','bread','butter','cheese','meat','soup','egg','jam', 'cake'];
      }

    switch(tile_amount) {
      case "42":
        tile_amount = 8;
        break;
      case "43":
        tile_amount = 12;
        break;
      case "44":
      default:
        tile_amount = 16;
      }

      len = tile_elems.length - tile_amount/2
      for (var i = 1; i <= len; i++) {
        rand_idx = randomInteger(0, tile_elems.length - 1);
        tile_elems.splice(rand_idx, 1);
      }

      var tile_elems_copy = tile_elems.slice();
      var tile_elems_imgs = tile_elems_copy.map(function(name) {
        return 'img_' + name;
      });
      tile_elems = tile_elems.concat(tile_elems_imgs)
      tile_elems.shuffle();
  }

  BtnPlay.prototype.changeScreen = function() {
    $('.screen_settings').hide()
    $('.screen_game').show()
  }

  BtnPlay.prototype.createTiles = function() {
    var tile_container = $('<div></div>').addClass('tile_container').insertAfter($('.screen_game_title'));
    var tile, tile_back, tile_front, idx;

    for (var i = 0; i < tile_amount; i++) {
      tile = $('<div></div>').addClass('tile').appendTo(tile_container);
      tile_back = $('<div></div>').addClass('tile_back').appendTo(tile);
      tile_front = $('<div></div>').addClass('tile_front').appendTo(tile);
      idx = tile_elems[i].indexOf('img_')
      if (idx == -1) {
        tile_front.html(tile_elems[i]).data('answer', tile_elems[i]);
      } else {
        klass = tile_elems[i].slice(4)
        tile_front.addClass(klass).data('answer', klass);
      }

      tiles[i] = tile;
      new Tile({ elem: tile[0] });
    }
  }









  function BtnSettings(options) {
    this.elem = options.elem;
    this.elem.onclick = this.onclick.bind(this);
  }

  BtnSettings.prototype.onclick = function() {
    this.changeScreen();
    this.removeTiles();
    this.resetGameParams();
  }

  BtnSettings.prototype.changeScreen = function() {
    $('.screen_game').hide();
    $('.screen_settings').show();
  }

  BtnSettings.prototype.removeTiles = function() {
    $('.tile_container').remove();
    tiles.length = 0;
  }

  BtnSettings.prototype.resetGameParams = function() {
    tiles = []
    tile_amount = null;
    tile_type = null;
    tile_elems = []
    opened_tiles = 0;
    animated = false;
  }






// class BtnRestart
  function BtnRestart(options) {
    this.elem = options.elem;
    this.elem.onclick = this.onclick.bind(this);
  }

  BtnRestart.prototype.onclick = function() {
    btn_settings.removeTiles();
    btn_settings.resetGameParams();
    btn_play.defineGameParams();
    btn_play.createTiles();
  }





// class Tile
 function Tile(options) {
    this.elem = options.elem;
    this.elem.onclick = this.onclick.bind(this);
  }

  Tile.prototype.onclick = function(e) {
    if (animated) return

    animated = true;
    cur_target = e.currentTarget;
    target = e.target;

    if ($(target).hasClass('tile_back') && opened_tiles < 2) {
      $(cur_target).find('.tile_front').addClass('turned');
      $(cur_target).find('.tile_back').addClass('turned');
      opened_tiles++;

      setTimeout(this.checkAmountOfTiles, 1000);
      return;
      }
    animated = false;
  }


  Tile.prototype.checkAmountOfTiles = function() {
    if (opened_tiles == 2) {
      if ($('.tile_front.turned').eq(0).data('answer') == $('.tile_front.turned').eq(1).data('answer')) {
        $('.tile_back.turned').remove();
        $('.tile_front.turned').fadeOut(1000);
        setTimeout(function(){ $('.tile_front.turned').remove() },1000);
      } else {
        $('.tile .turned').removeClass('turned');
      }
      opened_tiles = 0;
      setTimeout(function(){animated = false},1000);
      return;
    }
    animated = false;
  }

  Tile.prototype.turnAllTilesBack = function(i) {
  }







  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }












  var tiles = [],
      tile_amount = null,
      tile_type = null,
      tile_elems = [],
      opened_tiles = 0,
      animated = false;



  var btn_play = new BtnPlay({ elem: $('.btn_play')[0] });
  var btn_settings = new BtnSettings({ elem: $('.btn_settings')[0] });
  var btn_restart = new BtnRestart({ elem: $('.btn_restart')[0] });

});