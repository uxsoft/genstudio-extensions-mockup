import {jsx as $94hRE$jsx} from "react/jsx-runtime";
import {createContext as $94hRE$createContext, useContext as $94hRE$useContext, useReducer as $94hRE$useReducer, useCallback as $94hRE$useCallback, useEffect as $94hRE$useEffect, useMemo as $94hRE$useMemo} from "react";



const $4b5e069e9e001e8b$var$defaultContext = {
    revealAll: true,
    register () {},
    unregister () {},
    load () {}
};
const $4b5e069e9e001e8b$export$a37e899304e5fef0 = $4b5e069e9e001e8b$export$c991cd1e9f87d921();
function $4b5e069e9e001e8b$export$c991cd1e9f87d921() {
    return /*#__PURE__*/ (0, $94hRE$createContext)($4b5e069e9e001e8b$var$defaultContext);
}
function $4b5e069e9e001e8b$var$reducer(state, action) {
    switch(action.type){
        case 'register':
            if (state.loaded.get(action.url) !== false) {
                let loaded = new Map(state.loaded);
                loaded.set(action.url, false);
                return {
                    loadedAll: false,
                    // If we had previously loaded all items, then reset the timed out state
                    // since this is the first item of a new batch.
                    timedOut: state.loadedAll ? false : state.timedOut,
                    loadStartTime: state.loadedAll ? Date.now() : state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'unregister':
            if (state.loaded.has(action.url)) {
                let loaded = new Map(state.loaded);
                loaded.delete(action.url);
                return {
                    loadedAll: $4b5e069e9e001e8b$var$isAllLoaded(loaded),
                    timedOut: state.timedOut,
                    loadStartTime: state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'load':
            if (state.loaded.get(action.url) === false) {
                let loaded = new Map(state.loaded);
                loaded.set(action.url, true);
                return {
                    loadedAll: $4b5e069e9e001e8b$var$isAllLoaded(loaded),
                    timedOut: state.timedOut,
                    loadStartTime: state.loadStartTime,
                    loaded: loaded
                };
            }
            return state;
        case 'timeout':
            if (!state.loadedAll && !state.timedOut) return {
                ...state,
                timedOut: true
            };
            return state;
        default:
            return state;
    }
}
function $4b5e069e9e001e8b$var$isAllLoaded(loaded) {
    for (let isLoaded of loaded.values()){
        if (!isLoaded) return false;
    }
    return true;
}
function $4b5e069e9e001e8b$export$1b926c015f09611d(props) {
    // If we are already inside another ImageCoordinator, just pass
    // through children and coordinate loading at the root.
    let ctx = (0, $94hRE$useContext)(props.group || $4b5e069e9e001e8b$export$a37e899304e5fef0);
    if (ctx !== $4b5e069e9e001e8b$var$defaultContext) return props.children;
    return /*#__PURE__*/ (0, $94hRE$jsx)($4b5e069e9e001e8b$var$ImageCoordinatorRoot, {
        ...props
    });
}
function $4b5e069e9e001e8b$var$ImageCoordinatorRoot(props) {
    let { children: children, timeout: timeout = 5000, group: group = $4b5e069e9e001e8b$export$a37e899304e5fef0 } = props;
    let [{ loadedAll: loadedAll, timedOut: timedOut, loadStartTime: loadStartTime }, dispatch] = (0, $94hRE$useReducer)($4b5e069e9e001e8b$var$reducer, {
        loadedAll: true,
        timedOut: false,
        loadStartTime: 0,
        loaded: new Map()
    });
    let register = (0, $94hRE$useCallback)((url)=>dispatch({
            type: 'register',
            url: url
        }), []);
    let unregister = (0, $94hRE$useCallback)((url)=>dispatch({
            type: 'unregister',
            url: url
        }), []);
    let load = (0, $94hRE$useCallback)((url)=>dispatch({
            type: 'load',
            url: url
        }), []);
    (0, $94hRE$useEffect)(()=>{
        if (!loadedAll) {
            let timeoutId = setTimeout(()=>{
                dispatch({
                    type: 'timeout'
                });
            }, loadStartTime + timeout - Date.now());
            return ()=>clearTimeout(timeoutId);
        }
    }, [
        loadStartTime,
        loadedAll,
        timeout
    ]);
    let revealAll = loadedAll || timedOut;
    return (0, $94hRE$useMemo)(()=>/*#__PURE__*/ (0, $94hRE$jsx)(group.Provider, {
            value: {
                revealAll: revealAll,
                register: register,
                unregister: unregister,
                load: load
            },
            children: children
        }), [
        group,
        children,
        revealAll,
        register,
        unregister,
        load
    ]);
}


export {$4b5e069e9e001e8b$export$a37e899304e5fef0 as DefaultImageGroup, $4b5e069e9e001e8b$export$c991cd1e9f87d921 as createImageGroup, $4b5e069e9e001e8b$export$1b926c015f09611d as ImageCoordinator};
//# sourceMappingURL=ImageCoordinator.mjs.map
