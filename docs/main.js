(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['main'],
  {
    /***/ 0:
      /*!***********************************************!*\
  !*** multi ./apps/mixcore-portal/src/main.ts ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! /home/runner/work/mix.portal.angular-io/mix.portal.angular-io/apps/mixcore-portal/src/main.ts */ 'alH3'
        );

        /***/
      },

    /***/ D2X7:
      /*!***************************************************!*\
  !*** ./apps/mixcore-portal/src/app/app.module.ts ***!
  \***************************************************/
      /*! exports provided: AppModule */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'AppModule',
          function () {
            return AppModule;
          }
        );
        /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/platform-browser */ 'cUpR'
        );
        /* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./app.component */ 'SedF'
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/router */ 'iInd'
        );
        /* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./header/header.component */ 'qAyI'
        );
        /* harmony import */ var _carbon_icons_es_notification_16__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @carbon/icons/es/notification/16 */ 'Wjw2'
        );
        /* harmony import */ var _carbon_icons_es_user_avatar_16__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @carbon/icons/es/user--avatar/16 */ 'ui3M'
        );
        /* harmony import */ var _carbon_icons_es_app_switcher_16__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @carbon/icons/es/app-switcher/16 */ 'piQA'
        );
        /* harmony import */ var carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! carbon-components-angular */ '+uup'
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! @angular/core */ '8Y7J'
        );

        // carbon-components-angular default imports

        class AppModule {
          constructor(iconService) {
            this.iconService = iconService;
            iconService.registerAll([
              _carbon_icons_es_notification_16__WEBPACK_IMPORTED_MODULE_4__[
                'default'
              ],
              _carbon_icons_es_user_avatar_16__WEBPACK_IMPORTED_MODULE_5__[
                'default'
              ],
              _carbon_icons_es_app_switcher_16__WEBPACK_IMPORTED_MODULE_6__[
                'default'
              ],
            ]);
          }
        }
        AppModule.ɵfac = function AppModule_Factory(t) {
          return new (t || AppModule)(
            _angular_core__WEBPACK_IMPORTED_MODULE_8__['ɵɵinject'](
              carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__[
                'IconService'
              ]
            )
          );
        };
        AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__[
          'ɵɵdefineNgModule'
        ]({
          type: AppModule,
          bootstrap: [
            _app_component__WEBPACK_IMPORTED_MODULE_1__['AppComponent'],
          ],
        });
        AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__[
          'ɵɵdefineInjector'
        ]({
          providers: [],
          imports: [
            [
              _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                'BrowserModule'
              ],
              carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__[
                'UIShellModule'
              ],
              carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__[
                'IconModule'
              ],
              _angular_router__WEBPACK_IMPORTED_MODULE_2__[
                'RouterModule'
              ].forRoot([], { initialNavigation: 'enabled' }),
            ],
          ],
        });
        (function () {
          (typeof ngJitMode === 'undefined' || ngJitMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_8__[
              'ɵɵsetNgModuleScope'
            ](AppModule, {
              declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_1__['AppComponent'],
                _header_header_component__WEBPACK_IMPORTED_MODULE_3__[
                  'HeaderComponent'
                ],
              ],
              imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                  'BrowserModule'
                ],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__[
                  'UIShellModule'
                ],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__[
                  'IconModule'
                ],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__['RouterModule'],
              ],
              exports: [
                _header_header_component__WEBPACK_IMPORTED_MODULE_3__[
                  'HeaderComponent'
                ],
              ],
            });
        })();

        /***/
      },

    /***/ 'P/15':
      /*!*************************************************************!*\
  !*** ./apps/mixcore-portal/src/environments/environment.ts ***!
  \*************************************************************/
      /*! exports provided: environment */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'environment',
          function () {
            return environment;
          }
        );
        // This file can be replaced during build by using the `fileReplacements` array.
        // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
        // The list of file replacements can be found in `angular.json`.
        const environment = {
          production: false,
        };
        /*
         * For easier debugging in development mode, you can import the following file
         * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
         *
         * This import should be commented out in production mode because it will have a negative impact
         * on performance if an error is thrown.
         */
        // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

        /***/
      },

    /***/ SedF:
      /*!******************************************************!*\
  !*** ./apps/mixcore-portal/src/app/app.component.ts ***!
  \******************************************************/
      /*! exports provided: AppComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'AppComponent',
          function () {
            return AppComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ '8Y7J'
        );
        /* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./header/header.component */ 'qAyI'
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/router */ 'iInd'
        );

        class AppComponent {
          constructor() {
            this.title = 'mixcore-portal';
          }
        }
        AppComponent.ɵfac = function AppComponent_Factory(t) {
          return new (t || AppComponent)();
        };
        AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          'ɵɵdefineComponent'
        ]({
          type: AppComponent,
          selectors: [['mixcore-root']],
          decls: 3,
          vars: 0,
          consts: [[1, 'bx--content']],
          template: function AppComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelement'](
                0,
                'app-header'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                1,
                'main',
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelement'](
                2,
                'router-outlet'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
            }
          },
          directives: [
            _header_header_component__WEBPACK_IMPORTED_MODULE_1__[
              'HeaderComponent'
            ],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__['RouterOutlet'],
          ],
          styles: [
            '[_nghost-%COMP%] {\n  display: block;\n  font-family: sans-serif;\n  min-width: 300px;\n  max-width: 600px;\n  margin: 50px auto;\n}\n.gutter-left[_ngcontent-%COMP%] {\n  margin-left: 9px;\n}\n.col-span-2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.flex[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nheader[_ngcontent-%COMP%] {\n  background-color: #143055;\n  color: white;\n  padding: 5px;\n  border-radius: 3px;\n}\nmain[_ngcontent-%COMP%] {\n  padding: 0 36px;\n}\np[_ngcontent-%COMP%] {\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\n.resources[_ngcontent-%COMP%] {\n  text-align: center;\n  list-style: none;\n  padding: 0;\n  display: grid;\n  grid-gap: 9px;\n  grid-template-columns: 1fr 1fr;\n}\n.resource[_ngcontent-%COMP%] {\n  color: #0094ba;\n  height: 36px;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n  padding: 3px 9px;\n  text-decoration: none;\n}\n.resource[_ngcontent-%COMP%]:hover {\n  background-color: rgba(68, 138, 255, 0.04);\n}\npre[_ngcontent-%COMP%] {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: black;\n  color: #eee;\n}\ndetails[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  color: #333;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 3px 9px;\n  margin-bottom: 9px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n  height: 36px;\n  line-height: 36px;\n}\n.github-star-container[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  line-height: 20px;\n}\n.github-star-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n  color: #333;\n}\n.github-star-badge[_ngcontent-%COMP%] {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n}\n.github-star-badge[_ngcontent-%COMP%]:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n.github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFBQTtBQUdBO0VBQ0UsY0FBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUNGO0FBRUE7RUFDRSxlQUFBO0FBQ0Y7QUFFQTtFQUNFLGtCQUFBO0FBQ0Y7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBQ0Y7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FBQ0Y7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtBQUNGO0FBRUE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EscUNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFDRjtBQUVBO0VBQ0UsMENBQUE7QUFDRjtBQUVBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0FBQ0Y7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGtDQUFBO0VBQ0EscUNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7QUFFQTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBQ0Y7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7QUFDRjtBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0FBQ0Y7QUFFQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0VBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFFQTtFQUNFLGdFQUFBO0VBQ0Esb0NBQUE7RUFDQSwyQkFBQTtBQUNGO0FBQ0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FBRUYiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFJlbW92ZSB0ZW1wbGF0ZSBjb2RlIGJlbG93XG4gKi9cbjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBtaW4td2lkdGg6IDMwMHB4O1xuICBtYXgtd2lkdGg6IDYwMHB4O1xuICBtYXJnaW46IDUwcHggYXV0bztcbn1cblxuLmd1dHRlci1sZWZ0IHtcbiAgbWFyZ2luLWxlZnQ6IDlweDtcbn1cblxuLmNvbC1zcGFuLTIge1xuICBncmlkLWNvbHVtbjogc3BhbiAyO1xufVxuXG4uZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTQzMDU1O1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDVweDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG5tYWluIHtcbiAgcGFkZGluZzogMCAzNnB4O1xufVxuXG5wIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5oMSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IDE4cHg7XG4gIGZvbnQtc2l6ZTogMjRweDtcbn1cblxuaDIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbWFyZ2luOiA0MHB4IDAgMTBweCAwO1xufVxuXG4ucmVzb3VyY2VzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLWdhcDogOXB4O1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG59XG5cbi5yZXNvdXJjZSB7XG4gIGNvbG9yOiAjMDA5NGJhO1xuICBoZWlnaHQ6IDM2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogM3B4IDlweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG4ucmVzb3VyY2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDY4LCAxMzgsIDI1NSwgMC4wNCk7XG59XG5cbnByZSB7XG4gIHBhZGRpbmc6IDlweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgY29sb3I6ICNlZWU7XG59XG5cbmRldGFpbHMge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGNvbG9yOiAjMzMzO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICBwYWRkaW5nOiAzcHggOXB4O1xuICBtYXJnaW4tYm90dG9tOiA5cHg7XG59XG5cbnN1bW1hcnkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGhlaWdodDogMzZweDtcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XG59XG5cbi5naXRodWItc3Rhci1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMjBweDtcbn1cblxuLmdpdGh1Yi1zdGFyLWNvbnRhaW5lciBhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmdpdGh1Yi1zdGFyLWJhZGdlIHtcbiAgY29sb3I6ICMyNDI5MmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgcGFkZGluZzogM3B4IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjcsIDMxLCAzNSwgMC4yKTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgI2ZhZmJmYywgI2VmZjNmNiA5MCUpO1xuICBtYXJnaW4tbGVmdDogNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uZ2l0aHViLXN0YXItYmFkZ2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgI2YwZjNmNiwgI2U2ZWJmMSA5MCUpO1xuICBib3JkZXItY29sb3I6IHJnYmEoMjcsIDMxLCAzNSwgMC4zNSk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IC0wLjVlbTtcbn1cbi5naXRodWItc3Rhci1iYWRnZSAubWF0ZXJpYWwtaWNvbnMge1xuICBoZWlnaHQ6IDE2cHg7XG4gIHdpZHRoOiAxNnB4O1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbn1cbiJdfQ== */',
          ],
        });

        /***/
      },

    /***/ alH3:
      /*!*****************************************!*\
  !*** ./apps/mixcore-portal/src/main.ts ***!
  \*****************************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/platform-browser */ 'cUpR'
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/core */ '8Y7J'
        );
        /* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./app/app.module */ 'D2X7'
        );
        /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./environments/environment */ 'P/15'
        );

        if (
          _environments_environment__WEBPACK_IMPORTED_MODULE_3__['environment']
            .production
        ) {
          Object(
            _angular_core__WEBPACK_IMPORTED_MODULE_1__['enableProdMode']
          )();
        }
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
          'platformBrowser'
        ]()
          .bootstrapModule(
            _app_app_module__WEBPACK_IMPORTED_MODULE_2__['AppModule']
          )
          .catch((err) => console.error(err));

        /***/
      },

    /***/ qAyI:
      /*!****************************************************************!*\
  !*** ./apps/mixcore-portal/src/app/header/header.component.ts ***!
  \****************************************************************/
      /*! exports provided: HeaderComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'HeaderComponent',
          function () {
            return HeaderComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ '8Y7J'
        );
        /* harmony import */ var carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! carbon-components-angular */ '+uup'
        );

        class HeaderComponent {
          constructor() {}
          ngOnInit() {}
        }
        HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
          return new (t || HeaderComponent)();
        };
        HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          'ɵɵdefineComponent'
        ]({
          type: HeaderComponent,
          selectors: [['app-header']],
          decls: 11,
          vars: 0,
          consts: [
            ['name', 'Carbon Tutorial Angular'],
            ['ariaLabel', 'Carbon Tutorial Angular'],
            ['href', '/repos'],
            ['title', 'action'],
            ['ibmIcon', 'notification', 'size', '20'],
            ['ibmIcon', 'user--avatar', 'size', '20'],
            ['ibmIcon', 'app-switcher', 'size', '20'],
          ],
          template: function HeaderComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                0,
                'ibm-header',
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                1,
                'ibm-header-navigation',
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                2,
                'ibm-header-item',
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵtext'](
                3,
                'Repositories'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                4,
                'ibm-header-global'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                5,
                'ibm-header-action',
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵnamespaceSVG']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelement'](
                6,
                'svg',
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵnamespaceHTML']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                7,
                'ibm-header-action',
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵnamespaceSVG']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelement'](
                8,
                'svg',
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵnamespaceHTML']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                9,
                'ibm-header-action',
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵnamespaceSVG']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelement'](
                10,
                'svg',
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
            }
          },
          directives: [
            carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__['Header'],
            carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__[
              'HeaderNavigation'
            ],
            carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__[
              'HeaderItem'
            ],
            carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__[
              'HeaderGlobal'
            ],
            carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__[
              'HeaderAction'
            ],
            carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__[
              'IconDirective'
            ],
          ],
          styles: [
            '\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LnNjc3MifQ== */',
          ],
        });

        /***/
      },

    /***/ zn8P:
      /*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        function webpackEmptyAsyncContext(req) {
          // Here Promise.resolve().then() is used instead of new Promise() to prevent
          // uncaught exception popping up in devtools
          return Promise.resolve().then(function () {
            var e = new Error("Cannot find module '" + req + "'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          });
        }
        webpackEmptyAsyncContext.keys = function () {
          return [];
        };
        webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
        module.exports = webpackEmptyAsyncContext;
        webpackEmptyAsyncContext.id = 'zn8P';

        /***/
      },
  },
  [[0, 'runtime', 'vendor']],
]);
//# sourceMappingURL=main.js.map
