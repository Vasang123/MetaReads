export const initBeforeUnLoad = async (action: () => Promise<void>) => {
    window.onbeforeunload = async (event) => {
        action();  // Call action without awaiting
        console.log("Page is unloading...");

        // const e = event || window.event;
        // e.preventDefault(); // Necessary for older browsers
        // e.returnValue = '';
    };
};