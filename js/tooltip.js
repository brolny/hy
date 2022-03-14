
(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else if(typeof define === 'function' && define.cmd ){
        define(['jquery'], function(require, exports){
            factory(jQuery)
        })
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {


    function Tooltip(context, options){
        this.$context = $(context);
        if(!this.$context.size())return;
        return this.init.apply(this, Array.prototype.slice.call(arguments, 1));
    }

    Tooltip.prototype = {
        init: function(options){
            this.options = $.extend({
                //ж–№еђ‘
                direction: 'up',
                //ж ‡йў дёєз©єдёЌжѕз¤є
                title    : '',
                //revise = {left: 0, top: 0} дї®ж­Јleft, topдЅЌзЅ®
                revise:    {},
                //е†…е®№
                contenet : '',
                //ж·»еЉ зљ„class
                addClass : ''
            }, options)
            this.bindEvent()
        },
        setTemplate: function(){
            var tooltip = 'tooltip' + (this.options.addClass ? ' ' + this.options.addClass : ''),
                title   = this.options.title && '<div class="tooltip-title">'+this.options.title+'</div>';
            this.options.direction && (tooltip += ' tooltip-'+this.options.direction)
            this.$tooltip = $('<div class="'+ tooltip +'"><div class="tooltip-arrow"></div><div class="tooltip-content">'+ title +'<div class="tooltip-inner">'+ (this.options.content || '') +'</div></div></div>').appendTo('body')
        }, 
        bindEvent: function(){
            var self = this;
            this.$context.on('mouseover', $.proxy(this, 'enter'))
                .on('mouseout', function(){
                    self.isHide = true
                    self.leave()
                })
        },
        enter: function(){
            if(this.$tooltip){
                this.isHide = false
                return false
            }
            var self = this
            this.setTemplate()
            this.setPosition()
            this.isHide = true
            this.$tooltip.on('mouseover', function(){
                self.isHide = false
            })
            .on('mouseout', function(){
                self.isHide = true
                self.leave()
            })
            .fadeIn('slow')
        },
        setPosition: function(){
            var pos = this.$context.offset(), dir = this.options.direction,
                w = this.$context.outerWidth(), h = this.$context.outerHeight(),
                w2 = this.$tooltip.outerWidth(), h2 = this.$tooltip.outerHeight(),
                revise = this.options.revise;

            switch(dir){
                case 'down':
                    pos.top = pos.top - h2 + (revise && ~~revise.top || 0);
                    pos.left = pos.left + (w-w2)/2 + (revise && ~~revise.left || 0);
                break;
                case 'right':
                    pos.left = pos.left - w2 + (revise && ~~revise.left || 0);
                    pos.top = pos.top + (h-h2)/2 + (revise && ~~revise.top || 0);
                break;
                case 'left':
                    pos.left = pos.left + w + (revise && ~~revise.left || 0);
                    pos.top = pos.top + (h-h2)/2 + (revise && ~~revise.top || 0);
                break;
                default: 
                    pos.top  = pos.top + h + (revise && ~~revise.top || 0);
                    pos.left = pos.left + (w-w2)/2 + (revise && ~~revise.left || 0);
            }
            this.$tooltip.css(pos);
        },
        leave: function(){
            var self = this
            setTimeout(function(){
                if(!self.isHide)return
                self.$tooltip && self.$tooltip.fadeOut('fast', function(){
                    self.$tooltip.off('mouseout, mouseover').remove()
                    self.$tooltip = null
                })
            }, 200)
        }
    }


    $.fn.tooltip = function(options){
        $(this).each(function(){
            var $con = $(this).data('tooltip')
            !$con && $(this).data('tooltip', new Tooltip(this, options))
        })
    }

    $('[data-t]').each(function(){
        $(this).tooltip($(this).data('options'))
    })

    

}));








