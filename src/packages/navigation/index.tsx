import React, { useReducer } from "react";
import { useDispatch, useListener } from "@sensitive-dogs/event-bus";
import NavBar from "./components/nav-bar";
import NavDrawer from "./components/nav-drawer";

enum ACTIONS {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  CHANGE_ROUTE
}

const DEFAULT_MENU_CONTEXT = {
  drawer: {
    open: false
  },
  route: "/"
};

function createActions(
  dispatch: React.Dispatch<{ type: ACTIONS; value?: string }> | null,
  navigate: null | ((path: [string, string]) => void)
) {
  const actions = {
    openDrawer: () => {
      dispatch && dispatch({ type: ACTIONS.OPEN_DRAWER });
    },
    closeDrawer: () => {
      dispatch && dispatch({ type: ACTIONS.CLOSE_DRAWER });
    },
    navigate: (path: string, title: string) => {
      if (navigate) {
        navigate([path, title]);
      }
      actions.closeDrawer();
    }
  };
  return actions;
}

function reducer(
  state: typeof DEFAULT_MENU_CONTEXT,
  { type, value }: { type: ACTIONS; value?: string }
) {
  switch (type) {
    case ACTIONS.OPEN_DRAWER:
      return { ...state, drawer: { ...state.drawer, open: true } };
    case ACTIONS.CLOSE_DRAWER:
      return { ...state, drawer: { ...state.drawer, open: false } };
    case ACTIONS.CHANGE_ROUTE:
      return { ...state, route: value || state.route };
    default:
      return state;
  }
}

export const MenuContext = React.createContext<
  [typeof DEFAULT_MENU_CONTEXT, ReturnType<typeof createActions>]
>([DEFAULT_MENU_CONTEXT, createActions(null, null)]);

export default function Navigation({ route }: { route: string | undefined }) {
  const [state, dispatch] = useReducer(reducer, {
    ...DEFAULT_MENU_CONTEXT,
    route: route || DEFAULT_MENU_CONTEXT.route
  });
  const navigateFn = useDispatch<[string, string]>("app.navigate");
  const [eventRoute] = useListener<[string]>("app.navigate") || [undefined];

  React.useEffect(() => {
    if (eventRoute === undefined) return;

    dispatch({ type: ACTIONS.CHANGE_ROUTE, value: eventRoute });
  }, [eventRoute]);

  const actions = createActions(dispatch, navigateFn);
  return (
    <MenuContext.Provider value={[state, actions]}>
      <NavBar />
      <NavDrawer />
    </MenuContext.Provider>
  );
}
