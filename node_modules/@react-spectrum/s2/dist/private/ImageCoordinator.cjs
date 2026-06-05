var $8RQgN$reactjsxruntime = require("react/jsx-runtime");
var $8RQgN$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "DefaultImageGroup", () => $a4f1585b527b9b7a$export$a37e899304e5fef0);
$parcel$export(module.exports, "ImageCoordinator", () => $a4f1585b527b9b7a$export$1b926c015f09611d);


const $a4f1585b527b9b7a$var$defaultContext = {
    revealAll: true,
    register () {},
    unregister () {},
    load () {}
};
const $a4f1585b527b9b7a$export$a37e899304e5fef0 = $a4f1585b527b9b7a$export$c991cd1e9f87d921();
function $a4f1585b527b9b7a$export$c991cd1e9f87d921() {
    return /*#__PURE__*/ (0, $8RQgN$react.createContext)($a4f1585b527b9b7a$var$defaultContext);
}
function $a4f1585b527b9b7a$var$reducer(state, action) {
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
                    loadedAll: $a4f1585b527b9b7a$var$isAllLoaded(loaded),
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
                    loadedAll: $a4f1585b527b9b7a$var$isAllLoaded(loaded),
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
function $a4f1585b527b9b7a$var$isAllLoaded(loaded) {
    for (let isLoaded of loaded.values()){
        if (!isLoaded) return false;
    }
    return true;
}
function $a4f1585b527b9b7a$export$1b926c015f09611d(props) {
    // If we are already inside another ImageCoordinator, just pass
    // through children and coordinate loading at the root.
    let ctx = (0, $8RQgN$react.useContext)(props.group || $a4f1585b527b9b7a$export$a37e899304e5fef0);
    if (ctx !== $a4f1585b527b9b7a$var$defaultContext) return props.children;
    return /*#__PURE__*/ (0, $8RQgN$reactjsxruntime.jsx)($a4f1585b527b9b7a$var$ImageCoordinatorRoot, {
        ...props
    });
}
function $a4f1585b527b9b7a$var$ImageCoordinatorRoot(props) {
    let { children: children, timeout: timeout = 5000, group: group = $a4f1585b527b9b7a$export$a37e899304e5fef0 } = props;
    let [{ loadedAll: loadedAll, timedOut: timedOut, loadStartTime: loadStartTime }, dispatch] = (0, $8RQgN$react.useReducer)($a4f1585b527b9b7a$var$reducer, {
        loadedAll: true,
        timedOut: false,
        loadStartTime: 0,
        loaded: new Map()
    });
    let register = (0, $8RQgN$react.useCallback)((url)=>dispatch({
            type: 'register',
            url: url
        }), []);
    let unregister = (0, $8RQgN$react.useCallback)((url)=>dispatch({
            type: 'unregister',
            url: url
        }), []);
    let load = (0, $8RQgN$react.useCallback)((url)=>dispatch({
            type: 'load',
            url: url
        }), []);
    (0, $8RQgN$react.useEffect)(()=>{
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
    return (0, $8RQgN$react.useMemo)(()=>/*#__PURE__*/ (0, $8RQgN$reactjsxruntime.jsx)(group.Provider, {
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


//# sourceMappingURL=ImageCoordinator.cjs.map
