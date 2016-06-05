/*! minigram v0.0.1 | (c) 2016 Pedro Rogerio | https://github.com/pinceladasdaweb/minigram */
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Minigram = factory();
    }
}(this, function () {
    "use strict";

    var Minigram = function (target, options) {
        if (!this || !(this instanceof Minigram)) {
            return new Minigram(target, options);
        }

        if (!options) {
            console.log('%c Missing options', 'background: red; color: white');
            return;
        }

        this.endpoint   = 'https://api.instagram.com/v1/users/';
        this.container  = target.constructor.name === "Node" ? target : document.querySelector(target);
        this.counter    = options.counter || 10;
        this.resolution = options.resolution || 'thumb';
        this.token      = options.token;
        this.html       = options.html;
        this.success    = options.success || undefined;

        this.fetch();
    };

    Minigram.prototype = {
        fetch: function () {
            if (this.token.constructor.name !== "String") {
                console.log('%c Provide a valid token', 'background: red; color: white');
                return;
            }

            var userId = this.token.split('.')[0];

            this.getPhotos(userId);
        },
        jsonp: function (url, callback, context) {
            var name, head, script, extScript;

            name = 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);

            head           = document.head || document.getElementsByTagName('head')[0];
            extScript      = document.createElement('script');
            extScript.type = 'text/javascript';

            script       = extScript.cloneNode();
            script.src   = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + name;
            script.async = true;

            head.appendChild(script);

            window[name] = function (data) {
                callback.call((context || window), data);
                head.removeChild(script);
                script = null;
                delete this.name;
            }.bind(this);
        },
        template: function (string, data) {
            var piece;

            for (piece in data) {
                if (Object.prototype.hasOwnProperty.call(data, piece)) {
                    string = string.replace(new RegExp('{' + piece + '}', 'g'), data[piece]);
                }
            }

            return string;
        },
        each: function (collection, iterator) {
            var i, len;

            for (i = 0, len = collection.length; i < len; i += 1) {
                iterator(collection[i], i, collection);
            }
        },
        getObjectProperty: function (object, property) {
            var key, val;

            for (key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    val = object[property];
                }
            }

            return val;
        },
        getPhotos: function (userId) {
            var status;

            this.jsonp(this.endpoint + userId + '/media/recent?access_token=' + this.token + '&count=' + this.counter, function(res) {
                status = res.meta.code;

                if (status === 200) {
                    this.each(res.data, function (photo, index) {
                        res = {
                            'caption': photo.caption ? photo.caption.text : '',
                            'url': photo.link,
                            'type': photo.type,
                            'likes': photo.likes.count,
                            'filter': photo.filter,
                            image: {
                                'thumb': photo.images.thumbnail.url,
                                'low': photo.images.low_resolution.url,
                                'standard': photo.images.standard_resolution.url
                            }
                        }
                        this.attach(res);
                    }.bind(this));

                    typeof this.success === 'function' && this.success.call();
                } else {
                    console.warn('Minigram: ' + res.meta.error_message)
                }
            }.bind(this));
        },
        attach: function (data) {
            var photos;

            photos = this.template(
                this.html, {
                    caption: data.caption,
                    url: data.url,
                    type: data.type,
                    likes: data.likes,
                    filter: data.filter,
                    image: this.getObjectProperty(data.image, this.resolution)
            });

            this.container.insertAdjacentHTML('beforeend', photos);
        }
    };

    return Minigram;
}));