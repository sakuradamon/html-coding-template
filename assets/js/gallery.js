'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gallery = function () {
    function Gallery(_target, _item_width, _margin) {
        _classCallCheck(this, Gallery);

        this._target = _target;
        this._item_width = _item_width;
        this._margin = _margin;
        this._placement = new Placement(this._margin);
    }

    _createClass(Gallery, [{
        key: 'update',
        value: function update() {
            var box_item = $(this._target).children();
            //サイズ設定
            var w = $(this._target).width();
            var c = Math.floor((w - this._margin) / (this._item_width + this._margin));
            if (c <= 0) {
                c = 1;
            }
            var maxw = Math.floor((w - this._margin) / c) - this._margin;
            for (var i = 0; i < box_item.length; i++) {
                $(box_item[i]).css({ 'width': maxw + 'px' });
            }
            //初期化
            this._placement.init(maxw, c);
            //整列
            for (var i = 0; i < box_item.length; i++) {
                var h = $(box_item[i]).height();
                var p = this._placement.sort(h);
                $(box_item[i]).css({ 'top': p[1] + 'px', 'left': p[0] + 'px', 'width': maxw + 'px' });
            }
            //大枠の高さを調節
            $(this._target).css('height', this._placement.getHeight() + this._margin + 'px');
        }
    }]);

    return Gallery;
}();

var Placement = function () {
    function Placement(margin) {
        _classCallCheck(this, Placement);

        this._margin = margin;
    }

    _createClass(Placement, [{
        key: 'init',
        value: function init(item_width, column) {
            this._item_width = item_width;
            this._column = column;
            this._height = new Array();
            this._count = 0;
        }
    }, {
        key: 'sort',
        value: function sort(height) {
            var posi_x = 0;
            var posi_y = 0;
            var no = 0;
            var num = 0;

            //1列目
            if (this._count < this._column) {
                no = this._count;
                posi_x = this._item_width * no + this._margin * (no + 1);
                posi_y = this._margin;
                this._height[this._count] = height + this._margin;
                this._count++;
                return [posi_x, posi_y];
            }

            //2列目以降
            for (var i = 0; i < this._column; i++) {
                if (i == 0 || num > this._height[i]) {
                    no = i;
                    num = this._height[i];
                }
            }
            posi_x = this._item_width * no + this._margin * (no + 1);
            posi_y = this._height[no] + this._margin;
            this._height[no] = this._height[no] + height + this._margin;
            this._count++;
            return [posi_x, posi_y];
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            var max_height = Math.max.apply(null, this._height);
            if (max_height) {
                return max_height;
            } else {
                return 0;
            }
        }
    }]);

    return Placement;
}();

$(window).on('load', function () {
    //要素,横幅（最低値）、margin
    var gal = new Gallery('#gallery', 280, 20);
    gal.update();

    $(window).on('resize', function () {
        gal.update();
    });

    setInterval(function () {
        $('#gallery').prepend($('#reserve li:first'));
        $('#gallery li:last').css({ 'top': '', 'left': '', 'width': '' });
        $('#reserve').append($('#gallery li:last'));
        gal.update();
    }, 3000);
});
//# sourceMappingURL=gallery.js.map
