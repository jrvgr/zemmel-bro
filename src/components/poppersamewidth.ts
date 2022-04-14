/* eslint-disable no-param-reassign */
import { beforeWrite } from "@popperjs/core/lib/enums";

export const sameWidth = {
  name: "sameWidth",
  enabled: true,
  phase: beforeWrite,
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  },
};
