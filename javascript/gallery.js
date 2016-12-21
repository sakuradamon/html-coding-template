class Gallery {

    constructor(_target,_item_width,_margin) {
        this._target = _target;
        this._item_width = _item_width;
        this._margin = _margin;
        this._placement = new Placement(this._margin);
    }

    update() {
        let box_item = $(this._target).children();
        //サイズ設定
        let w = $(this._target).width();
        let c = Math.floor((w - this._margin) / (this._item_width + this._margin));
        if (c <= 0) {
            c = 1;
        }
        let maxw = Math.floor((w - this._margin) / c) - this._margin;
        for (var i = 0; i < box_item.length; i++){
            $(box_item[i]).css({'width': maxw+'px'});
        }
        //初期化
        this._placement.init(maxw, c);
        //整列
        for (var i = 0; i < box_item.length; i++){
            let h = $(box_item[i]).height();
            let p = this._placement.sort(h);
            $(box_item[i]).css({'top': p[1]+'px', 'left': p[0]+'px', 'width': maxw+'px'});
        }
        //大枠の高さを調節
        $(this._target).css('height', this._placement.getHeight()+this._margin+'px');
    }
}

class Placement {

    constructor(margin) {
        this._margin = margin;
    }

    init(item_width, column) {
        this._item_width = item_width;
        this._column = column;
        this._height = new Array();
        this._count = 0;
    }

    sort(height) {
        let posi_x = 0;
        let posi_y = 0;
        let no = 0;
        let num = 0;

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
        for (let i = 0; i < this._column; i++) {
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

    getHeight() {
        let max_height = Math.max.apply(null, this._height);
        if (max_height) {
            return max_height;
        } else {
            return 0;
        }
    }
}

$(window).on('load',function(){
    //要素,横幅（最低値）、margin
    var gal = new Gallery('#gallery', 280, 20);
    gal.update();

    $(window).on('resize', function () {
        gal.update();
    });

    setInterval(function () {
        $('#gallery').prepend($('#reserve li:first'));
        $('#gallery li:last').css({'top': '', 'left': '', 'width': ''});
        $('#reserve').append($('#gallery li:last'));
        gal.update();
    }, 3000);
});
