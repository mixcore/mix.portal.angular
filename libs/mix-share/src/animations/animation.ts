import {
  AUTO_STYLE,
  AnimationReferenceMetadata,
  AnimationTriggerMetadata,
  animate,
  animateChild,
  animation,
  group,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

export interface IAnimationOptions {
  anchor?: string;
  duration?: number;
  delay?: number;
  animateChildren?: 'before' | 'together' | 'after' | 'none';
}

export interface ISlideInLeftAnimationOptions extends IAnimationOptions {
  translate?: string;
}

export interface IAttentionSeekerAnimationOptions extends IAnimationOptions {
  direction?: '<=>' | '=>';
}

const DEFAULT_DURATION = 750;

export function useAnimationIncludingChildren(
  animation: AnimationReferenceMetadata,
  options?: IAnimationOptions
) {
  return [
    ...(options && options.animateChildren === 'before'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
    group([
      useAnimation(animation),
      ...(!options ||
      !options.animateChildren ||
      options.animateChildren === 'together'
        ? [query('@*', animateChild(), { optional: true })]
        : []),
    ]),
    ...(options && options.animateChildren === 'after'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
  ];
}

export function animateIncludingChildren(
  easing: 'ease-in' | 'ease-out',
  options?: IAnimationOptions
) {
  return [
    ...(options && options.animateChildren === 'before'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
    group([
      group([
        query('@*', animateChild(), { optional: true }),
        animate('{{duration}}' + 'ms ' + '{{delay}}' + 'ms ' + easing),
      ]),
      ...(!options ||
      !options.animateChildren ||
      options.animateChildren === 'together'
        ? [query('@*', animateChild(), { optional: true })]
        : []),
    ]),
    ...(options && options.animateChildren === 'after'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
  ];
}

const bounceIn = () =>
  animation(
    group([
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({
            transform: 'scale3d(0.3, 0.3, 0.3)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 0,
          }),
          style({
            transform: 'scale3d(1.1, 1.1, 1.1)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 0.2,
          }),
          style({
            transform: 'scale3d(0.9, 0.9, 0.9)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 0.4,
          }),
          style({
            transform: 'scale3d(1.03, 1.03, 1.03)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 0.6,
          }),
          style({
            transform: 'scale3d(0.97, 0.97, 0.97)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 0.8,
          }),
          style({
            transform: 'scale3d(1, 1, 1)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 1,
          }),
        ])
      ),
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({
            visibility: 'visible',
            opacity: 1,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 0,
          }),
          style({
            opacity: 1,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 0.6,
          }),
          style({
            opacity: 1,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            offset: 1,
          }),
        ])
      ),
    ])
  );

export function bounceInAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceIn', [
    transition(
      '0 => 1',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(bounceIn(), options),
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function bounceInOnEnterAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInOnEnter', [
    transition(
      ':enter',
      animation([
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(bounceIn(), options),
      ]),
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

const bounceOut = () =>
  animation(
    group([
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 0 }),
          style({
            transform: 'scale3d(0.9, 0.9, 0.9)',
            easing: 'ease',
            offset: 0.2,
          }),
          style({
            transform: 'scale3d(1.1, 1.1, 1.1)',
            easing: 'ease',
            offset: 0.5,
          }),
          style({
            transform: 'scale3d(1.1, 1.1, 1.1)',
            easing: 'ease',
            offset: 0.55,
          }),
          style({
            transform: 'scale3d(0.3, 0.3, 0.3)',
            easing: 'ease',
            offset: 1,
          }),
        ])
      ),
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ opacity: 1, easing: 'ease', offset: 0 }),
          style({ opacity: 1, easing: 'ease', offset: 0.55 }),
          style({ opacity: 0, easing: 'ease', offset: 1 }),
        ])
      ),
    ])
  );

export function bounceOutAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceOut', [
    transition(
      '0 => 1',
      [...useAnimationIncludingChildren(bounceOut(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function bounceOutOnLeaveAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceOutOnLeave', [
    transition(
      ':leave',
      [...useAnimationIncludingChildren(bounceOut(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

const slideInLeft = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'translate3d(-{{translate}}, 0, 0)',
          easing: 'ease',
          opacity: 0,
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          opacity: AUTO_STYLE,
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ]);

export function slideInLeftAnimation(
  options?: ISlideInLeftAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'slideInLeft', [
    transition(
      '0 => 1',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(slideInLeft(), options),
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          translate: (options && options.translate) || '100%',
        },
      }
    ),
  ]);
}

export function slideInLeftOnEnterAnimation(
  options?: ISlideInLeftAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'slideInLeftOnEnter', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(slideInLeft(), options),
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          translate: (options && options.translate) || '100%',
        },
      }
    ),
  ]);
}

const slideInRight = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'translate3d({{translate}}, 0, 0)',
          easing: 'ease-out',
          opacity: 0,
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          opacity: AUTO_STYLE,
          easing: 'ease-out',
          offset: 1,
        }),
      ])
    ),
  ]);

export function slideInRightAnimation(
  options?: ISlideInLeftAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'slideInLeft', [
    transition(
      '0 => 1',
      [...useAnimationIncludingChildren(slideInLeft(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          translate: (options && options.translate) || '100%',
        },
      }
    ),
  ]);
}

export function slideInRightOnEnterAnimation(
  options?: ISlideInLeftAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'slideInRightOnEnter', [
    transition(
      ':enter',
      [...useAnimationIncludingChildren(slideInRight(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          translate: (options && options.translate) || '100%',
        },
      }
    ),
  ]);
}

export function collapseAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'collapse', [
    state(
      '1',
      style({
        height: '0',
        visibility: 'hidden',
        overflow: 'hidden',
      })
    ),
    state(
      '0',
      style({
        height: AUTO_STYLE,
        visibility: AUTO_STYLE,
        overflow: 'hidden',
      })
    ),
    transition('0 => 1', [...animateIncludingChildren('ease-in', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
    transition('1 => 0', [...animateIncludingChildren('ease-out', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
  ]);
}

export function collapseHorizontallyAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'collapseHorizontally', [
    state(
      '1',
      style({
        width: '0',
        visibility: 'hidden',
        overflow: 'hidden',
      })
    ),
    state(
      '0',
      style({
        width: AUTO_STYLE,
        visibility: AUTO_STYLE,
        overflow: 'hidden',
      })
    ),
    transition('0 => 1', [...animateIncludingChildren('ease-in', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
    transition('1 => 0', [...animateIncludingChildren('ease-out', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
  ]);
}

const expand = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          height: '0',
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-out',
          offset: 0,
        }),
        style({
          height: AUTO_STYLE,
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          easing: 'ease-out',
          offset: 1,
        }),
      ])
    )
  );

const expandRight = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          width: '0',
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-out',
          offset: 0,
        }),
        style({
          width: AUTO_STYLE,
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          easing: 'ease-out',
          offset: 1,
        }),
      ])
    )
  );

const fadeInExpand = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          height: '0',
          opacity: 0,
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-out',
          offset: 0,
        }),
        style({
          height: AUTO_STYLE,
          opacity: AUTO_STYLE,
          easing: 'ease-out',
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          offset: 1,
        }),
      ])
    )
  );

const fadeInExpandRight = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          width: '0',
          opacity: 0,
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-out',
          offset: 0,
        }),
        style({
          width: AUTO_STYLE,
          opacity: AUTO_STYLE,
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          easing: 'ease-out',
          offset: 1,
        }),
      ])
    )
  );

const collapse = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          height: AUTO_STYLE,
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 0,
        }),
        style({
          height: '0',
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 1,
        }),
      ])
    )
  );

const collapseLeft = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          width: AUTO_STYLE,
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 0,
        }),
        style({
          width: '0',
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 1,
        }),
      ])
    )
  );

const fadeOutCollapse = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          height: AUTO_STYLE,
          opacity: AUTO_STYLE,
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 0,
        }),
        style({
          height: '0',
          opacity: 0,
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 1,
        }),
      ])
    )
  );

const fadeOutCollapseLeft = () =>
  animation(
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          width: AUTO_STYLE,
          opacity: AUTO_STYLE,
          visibility: AUTO_STYLE,
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 0,
        }),
        style({
          width: '0',
          opacity: 0,
          visibility: 'hidden',
          overflow: 'hidden',
          easing: 'ease-in',
          offset: 1,
        }),
      ])
    )
  );

export function expandOnEnterAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'expandOnEnter', [
    transition(
      ':enter',
      animation([
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(expand(), options),
      ]),
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function expandRightOnEnterAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'expandRightOnEnter', [
    transition(
      ':enter',
      animation([
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(expandRight(), options),
      ]),
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function collapseOnLeaveAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'collapseOnLeave', [
    transition(
      ':leave',
      [...useAnimationIncludingChildren(collapse(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function collapseLeftOnLeaveAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'collapseLeftOnLeave', [
    transition(
      ':leave',
      [...useAnimationIncludingChildren(collapseLeft(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function fadeInExpandOnEnterAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInExpandOnEnter', [
    transition(
      ':enter',
      animation([
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(fadeInExpand(), options),
      ]),
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function fadeInExpandRightOnEnterAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInExpandRightOnEnter', [
    transition(
      ':enter',
      animation([
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(fadeInExpandRight(), options),
      ]),
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function fadeOutCollapseOnLeaveAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutCollapseOnLeave', [
    transition(
      ':leave',
      [...useAnimationIncludingChildren(fadeOutCollapse(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function fadeOutCollapseLeftOnLeaveAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeOutCollapseLeftOnLeave', [
    transition(
      ':leave',
      [...useAnimationIncludingChildren(fadeOutCollapseLeft(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

const bounce = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: AUTO_STYLE,
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.2,
        }),
        style({
          transform: 'translate3d(0, -30px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.4,
        }),
        style({
          transform: 'translate3d(0, -30px, 0)',
          easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
          offset: 0.43,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
          offset: 0.53,
        }),
        style({
          transform: 'translate3d(0, -15px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.7,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
          offset: 0.8,
        }),
        style({
          transform: 'translate3d(0, -4px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.9,
        }),
        style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
      ])
    ),
  ]);

export function bounceAnimation(
  options?: IAttentionSeekerAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounce', [
    transition(
      `0 ${(options && options.direction) || '<=>'} 1`,
      [
        style({ 'transform-origin': 'center bottom' }),
        ...useAnimationIncludingChildren(bounce(), options),
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

const rubberBand = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: AUTO_STYLE,
          transform: 'scale3d(1, 1, 1)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          transform: 'scale3d(1.25, 0.75, 1)',
          easing: 'ease',
          offset: 0.3,
        }),
        style({
          transform: 'scale3d(0.85, 1.25, 1)',
          easing: 'ease',
          offset: 0.4,
        }),
        style({
          transform: 'scale3d(1.15, 0.85, 1)',
          easing: 'ease',
          offset: 0.5,
        }),
        style({
          transform: 'scale3d(0.95, 1.05, 1)',
          easing: 'ease',
          offset: 0.65,
        }),
        style({
          transform: 'scale3d(1.05, 0.95, 1)',
          easing: 'ease',
          offset: 0.75,
        }),
        style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 1 }),
      ])
    ),
  ]);

export function rubberBandAnimation(
  options?: IAttentionSeekerAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'rubberBand', [
    transition(
      `0 ${(options && options.direction) || '<=>'} 1`,
      [...useAnimationIncludingChildren(rubberBand(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

const zoomOutLeft = () =>
  animation(
    group([
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({
            opacity: 0.7,
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)',
            easing: 'ease',
            offset: 0.4,
          }),
          style({
            opacity: 0.3,
            transform:
              'scale3d(0.275, 0.275, 0.275) translate3d(-1000px, 0, 0)',
            easing: 'ease',
            offset: 0.7,
          }),
          style({
            opacity: 0,
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(-2000px, 0, 0)',
            easing: 'ease',
            offset: 1,
          }),
        ])
      ),
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ 'transform-origin': 'center center', offset: 0 }),
          style({ 'transform-origin': 'left center', offset: 0.4 }),
        ])
      ),
    ])
  );

export function zoomOutLeftAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'zoomOutLeft', [
    transition(
      '0 => 1',
      [...useAnimationIncludingChildren(zoomOutLeft(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export function zoomOutLeftOnLeaveAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'zoomOutLeftOnLeave', [
    transition(
      ':leave',
      [...useAnimationIncludingChildren(zoomOutLeft(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
        },
      }
    ),
  ]);
}

export interface IFadeInRightgAnimationOptions extends IAnimationOptions {
  translate?: string;
}

const fadeInRight = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translate3d({{translate}}, 0, 0)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ]);

export function fadeInRightAnimation(
  options?: IFadeInRightgAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInRight', [
    transition(
      '0 => 1',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(fadeInRight(), options),
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          translate: (options && options.translate) || '100%',
        },
      }
    ),
  ]);
}

export function fadeInRightOnEnterAnimation(
  options?: IFadeInRightgAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInRightOnEnter', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(fadeInRight(), options),
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          translate: (options && options.translate) || '100%',
        },
      }
    ),
  ]);
}
