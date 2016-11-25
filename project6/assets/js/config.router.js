'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
).service('authInterceptor', function ($location, $config, UserService, cfpLoadingBar) {
        var service = this;
        service.request = function (config) {
            cfpLoadingBar.start(); //加载动画开始
            var currentUser = UserService.getCurrentUser(),
                accessToken = currentUser ? currentUser.accessToken : null;
            config.headers = config.headers || {};
            if (config.headers) {
                config.headers['Content-Type'] = 'application/json';
                // var userAuthStore = store.get($config.userAuthStore);
                if (accessToken) {
                    config.headers[$config.accessPassportToken] = userAuthStore.accessToken;
                }
            }
            return config;
        };
        service.response = function (response) {
            cfpLoadingBar.complete(); //加载结束
            var accessToken = response.headers($config.accessPassportToken);
            if ((accessToken && accessToken == 'FAIL') || accessToken == 'null' || accessToken == null) {
                // UCX_Utils.toForward($location.absUrl());
                // return;
            }
            return response;
        };
    }).service('UserService', function ($config) {
        var service = this,
            currentUser = null;
        service.setCurrentUser = function (user) {
            currentUser = user;

            // store.set($config.userAuthStore, user);
            return currentUser;
        };

        service.getCurrentUser = function () {
            if (!currentUser) {
                // currentUser = store.get($config.userAuthStore);
            }
            return currentUser;
        };
    })
    .config(
    ['$stateProvider', '$httpProvider', '$urlRouterProvider', 'JQ_CONFIG', '$ocLazyLoadProvider',
        function ($stateProvider, $httpProvider, $urlRouterProvider, JQ_CONFIG, $ocLazyLoadProvider) {
            $httpProvider.interceptors.push('authInterceptor'); //拦截器
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            // Enables Request.IsAjaxRequest() in MVC
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            // Disable IE ajax request caching
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
                modules: JQ_CONFIG.modules
            });
            $urlRouterProvider
                .otherwise('/app/dashboard-v1');
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html',
                    resolve:loadSequence('utilsService','aside','sweetAlert')

                })
                .state('app.dashboard-v1', {
                    url: '/dashboard-v1',
                    templateUrl: 'tpl/app_dashboard_v1.html',
                    resolve:loadSequence('chartCtrl')
                })
                .state('app.dashboard-v2', {
                    url: '/dashboard-v2',
                    templateUrl: 'tpl/app_dashboard_v2.html',
                    resolve:loadSequence('chartCtrl')
                })
                .state('app.ui', {
                    url: '/ui',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.ui.buttons', {
                    url: '/buttons',
                    templateUrl: 'tpl/ui_buttons.html'
                })
                .state('app.ui.icons', {
                    url: '/icons',
                    templateUrl: 'tpl/ui_icons.html'
                })
                .state('app.ui.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/ui_grid.html'
                })
                .state('app.ui.widgets', {
                    url: '/widgets',
                    templateUrl: 'tpl/ui_widgets.html'
                })
                .state('app.ui.bootstrap', {
                    url: '/bootstrap',
                    templateUrl: 'tpl/ui_bootstrap.html'
                })
                .state('app.ui.sortable', {
                    url: '/sortable',
                    templateUrl: 'tpl/ui_sortable.html'
                })
                .state('app.ui.scroll', {
                    url: '/scroll',
                    templateUrl: 'tpl/ui_scroll.html',
                    resolve:loadSequence('scrollCtrl')
                })
                .state('app.ui.portlet', {
                    url: '/portlet',
                    templateUrl: 'tpl/ui_portlet.html'
                })
                .state('app.ui.timeline', {
                    url: '/timeline',
                    templateUrl: 'tpl/ui_timeline.html'
                })
                .state('app.ui.tree', {
                    url: '/tree',
                    templateUrl: 'tpl/ui_tree.html',
                    resolve:loadSequence('angularBootstrapNavTree','treeCtrl')
                })
                .state('app.ui.toaster', {
                    url: '/toaster',
                    templateUrl: 'tpl/ui_toaster.html',
                    resolve:loadSequence('toaster','toasterCtrl')
                })
                .state('app.ui.jvectormap', {
                    url: '/jvectormap',
                    templateUrl: 'tpl/ui_jvectormap.html',
                    resolve:loadSequence('vectormap')
                })
                .state('app.ui.googlemap', {
                    url: '/googlemap',
                    templateUrl: 'tpl/ui_googlemap.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'assets/js/app/map/load-google-maps.js',
                                    'assets/js/app/map/ui-map.js',
                                    'assets/js/app/map/map.js'
                                ]).then(
                                    function () {
                                        return loadGoogleMaps();
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.chart', {
                    url: '/chart',
                    templateUrl: 'tpl/ui_chart.html',
                    resolve:loadSequence('chartCtrl')
                })
                // table
                .state('app.table', {
                    url: '/table',
                    template: '<div ui-view></div>'
                })
                .state('app.table.static', {
                    url: '/static',
                    templateUrl: 'tpl/table_static.html'
                })
                .state('app.table.datatable', {
                    url: '/datatable',
                    templateUrl: 'tpl/table_datatable.html'
                })
                .state('app.table.footable', {
                    url: '/footable',
                    templateUrl: 'tpl/table_footable.html'
                })
                .state('app.table.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/table_grid.html',
                    resolve:loadSequence('ngGrid','gridCtrl')
                })
                .state('app.table.uigrid', {
                    url: '/uigrid',
                    templateUrl: 'tpl/table_uigrid.html',
                    resolve:loadSequence('ui.grid','uigridCtrl')
                })
                .state('app.table.editable', {
                    url: '/editable',
                    templateUrl: 'tpl/table_editable.html',
                    controller: 'XeditableCtrl',
                    resolve:loadSequence('xeditable','xeditableCtrl')
                })
                .state('app.table.smart', {
                    url: '/smart',
                    templateUrl: 'tpl/table_smart.html',
                    resolve:loadSequence('smart-table','table')
                })
                // form
                .state('app.form', {
                    url: '/form',
                    template: '<div ui-view class="fade-in"></div>',
                    resolve:loadSequence('form')
                })
                .state('app.form.elements', {
                    url: '/elements',
                    templateUrl: 'tpl/form_elements.html',
                    resolve:loadSequence('formElements','dcalendar')
                })
                .state('app.form.validation', {
                    url: '/validation',
                    templateUrl: 'tpl/form_validation.html'
                })
                .state('app.form.wizard', {
                    url: '/wizard',
                    templateUrl: 'tpl/form_wizard.html'
                })
                .state('app.form.fileupload', {
                    url: '/fileupload',
                    templateUrl: 'tpl/form_fileupload.html',
                    resolve:loadSequence('angularFileUpload','file-upload')
                })
                .state('app.form.imagecrop', {
                    url: '/imagecrop',
                    templateUrl: 'tpl/form_imagecrop.html',
                    resolve:loadSequence('ngImgCrop','imgcrop')
                })
                .state('app.form.select', {
                    url: '/select',
                    templateUrl: 'tpl/form_select.html',
                    controller: 'SelectCtrl',
                    resolve:loadSequence('ui.select','select')
                })
                .state('app.form.slider', {
                    url: '/slider',
                    templateUrl: 'tpl/form_slider.html',
                    controller: 'SliderCtrl',
                    resolve:loadSequence('vr.directives.slider','sliderCtrl')
                })
                .state('app.form.editor', {
                    url: '/editor',
                    templateUrl: 'tpl/form_editor.html',
                    controller: 'EditorCtrl',
                    resolve:loadSequence('textAngular','editorCtrl')
                })
                .state('app.form.xeditable', {
                    url: '/xeditable',
                    templateUrl: 'tpl/form_xeditable.html',
                    controller: 'XeditableCtrl',
                    resolve:loadSequence('xeditable','xeditablectrl')
                })
                // pages
                .state('app.page', {
                    url: '/page',
                    template: '<div ui-view class="fade-in-down"></div>'
                })
                .state('app.page.profile', {
                    url: '/profile',
                    templateUrl: 'tpl/page_profile.html'
                })
                .state('app.page.post', {
                    url: '/post',
                    templateUrl: 'tpl/page_post.html'
                })
                .state('app.page.search', {
                    url: '/search',
                    templateUrl: 'tpl/page_search.html'
                })
                .state('app.page.invoice', {
                    url: '/invoice',
                    templateUrl: 'tpl/page_invoice.html'
                })
                .state('app.page.price', {
                    url: '/price',
                    templateUrl: 'tpl/page_price.html'
                })
                .state('app.docs', {
                    url: '/docs',
                    templateUrl: 'tpl/docs.html'
                })
                // others
                .state('lockme', {
                    url: '/lockme',
                    templateUrl: 'tpl/page_lockme.html'
                })
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('access.signin', {
                    url: '/signin',
                    templateUrl: 'tpl/page_signin.html',
                    resolve:loadSequence('signin')
                })
                .state('access.signup', {
                    url: '/signup',
                    templateUrl: 'tpl/page_signup.html',
                    resolve:loadSequence('signup')
                })
                .state('access.forgotpwd', {
                    url: '/forgotpwd',
                    templateUrl: 'tpl/page_forgotpwd.html'
                })
                .state('access.404', {
                    url: '/404',
                    templateUrl: 'tpl/page_404.html'
                })

                // fullCalendar
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'tpl/app_calendar.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function ($ocLazyLoad, uiLoad) {
                                return uiLoad.load(
                                    JQ_CONFIG.fullcalendar.concat('assets/js/app/calendar/calendar.js')
                                ).then(
                                    function () {
                                        return $ocLazyLoad.load('ui.calendar');
                                    }
                                )
                            }
                        ]
                    }
                })

                // aside
                .state('app.aside', {
                    url: '/aside',
                    templateUrl: 'tpl/ui_modals.html',
                    resolve: loadSequence('modalCtrl')
                })

                // aside
                .state('app.list', {
                    url: '/list',
                    templateUrl: 'tpl/app_list.html',
                    resolve: loadSequence('listCtrl')
                })

                // mail
                .state('app.mail', {
                    abstract: true,
                    url: '/mail',
                    templateUrl: 'tpl/mail.html',
                    resolve: loadSequence('mail')
                })
                .state('app.mail.list', {
                    url: '/inbox/{fold}',
                    templateUrl: 'tpl/mail.list.html'
                })
                .state('app.mail.detail', {
                    url: '/{mailId:[0-9]{1,4}}',
                    templateUrl: 'tpl/mail.detail.html'
                })
                .state('app.mail.compose', {
                    url: '/compose',
                    templateUrl: 'tpl/mail.new.html'
                })

                .state('layout', {
                    abstract: true,
                    url: '/layout',
                    templateUrl: 'tpl/layout.html'
                })
                .state('layout.fullwidth', {
                    url: '/fullwidth',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_fullwidth.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: loadSequence('vectormapCtrl')
                })
                .state('layout.mobile', {
                    url: '/mobile',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_mobile.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_mobile.html'
                        }
                    }
                })
                .state('layout.app', {
                    url: '/app',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_app.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: loadSequence('tabCtrl')
                })
                .state('apps', {
                    abstract: true,
                    url: '/apps',
                    templateUrl: 'tpl/layout.html'
                })
                .state('apps.note', {
                    url: '/note',
                    templateUrl: 'tpl/apps_note.html',
                    resolve: loadSequence('noteCtrl')
                })
                .state('apps.contact', {
                    url: '/contact',
                    templateUrl: 'tpl/apps_contact.html',
                    resolve: loadSequence('contactCtrl')
                })
                .state('app.weather', {
                    url: '/weather',
                    templateUrl: 'tpl/apps_weather.html',
                    resolve: loadSequence('angular-skycons')
                })
                .state('app.todo', {
                    url: '/todo',
                    templateUrl: 'tpl/apps_todo.html',
                    resolve: loadSequence('todoCtrl')
                })
                .state('app.todo.list', {
                    url: '/{fold}'
                })
                .state('music', {
                    url: '/music',
                    templateUrl: 'tpl/music.html',
                    controller: 'MusicCtrl',
                    resolve:loadSequence('com.2fdevs.videogular','com.2fdevs.videogular.plugins.controls',
                        'com.2fdevs.videogular.plugins.overlayplay','com.2fdevs.videogular.plugins.poster',
                        'com.2fdevs.videogular.plugins.buffering','ctrl')
                })
                .state('music.home', {
                    url: '/home',
                    templateUrl: 'tpl/music.home.html'
                })
                .state('music.genres', {
                    url: '/genres',
                    templateUrl: 'tpl/music.genres.html'
                })
                .state('music.detail', {
                    url: '/detail',
                    templateUrl: 'tpl/music.detail.html'
                })
                .state('music.mtv', {
                    url: '/mtv',
                    templateUrl: 'tpl/music.mtv.html'
                })
                .state('music.mtvdetail', {
                    url: '/mtvdetail',
                    templateUrl: 'tpl/music.mtv.detail.html'
                })
                .state('music.playlist', {
                    url: '/playlist/{fold}',
                    templateUrl: 'tpl/music.playlist.html'
                })
                .state('app.works', {//工作台事务
                    abstract: true,
                    url: '/works',
                    templateUrl: 'tpl/app_works.html',
                    resolve:loadSequence('worksCtrl')
                })
                .state('app.works.list', {
                    url: '/inbox/{fold}',
                    templateUrl: 'tpl/app_works.list.html'
                })
                .state('app.works.detail', {
                    url: '/{mailId:[0-9]{1,4}}',
                    templateUrl: 'tpl/app_works.details.html'
                })
                .state('app.chat', {//工作台消息
                    url: '/chat',
                    templateUrl: 'tpl/app_chat.html',
                    resolve:loadSequence('chatCtrl','tabCtrl')
                })
                .state('app.chat.content', {
                    url: '/content',
                    params: {
                        item: null
                    },
                    templateUrl: 'tpl/chat-content.html'
                })
                //聊天demo
                .state('app.chatDemo', {
                    url: '/chatDemo',
                    templateUrl: 'tpl/chat-demo.html',
                    resolve:loadSequence('chatDemoCtrl','tabCtrl')
                })
            ;


            function loadSequence() {
                var _args = arguments;
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function ($ocLL, $q) {
                            var promise = $q.when(1);
                            for (var i = 0, len = _args.length; i < len; i++) {
                                promise = promiseThen(_args[i]);
                            }
                            return promise;

                            function promiseThen(_arg) {
                                if (typeof _arg == 'function')
                                    return promise.then(_arg);
                                else
                                    return promise.then(function () {
                                        var nowLoad = requiredData(_arg);
                                        if (!nowLoad)
                                            return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                        return $ocLL.load(nowLoad);
                                    });
                            }

                            function requiredData(name) {
                                if (JQ_CONFIG.modules)
                                    for (var m in JQ_CONFIG.modules)
                                        if (JQ_CONFIG.modules[m].name && JQ_CONFIG.modules[m].name === name)
                                            return JQ_CONFIG.modules[m];
                                return JQ_CONFIG.script && JQ_CONFIG.script[name];
                            }
                        }]
                };
            }
        }
    ]
);
