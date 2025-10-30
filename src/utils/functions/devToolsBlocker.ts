(function () {
    let devtoolsOpen = false;
    let threshold = 160;

    function detectDevTools() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;

        if (widthDiff > threshold || heightDiff > threshold) {
            return true;
        }

        return false;
    }

    // Detect opening via console.log getter trick
    const element = new Image();
    Object.defineProperty(element, "id", {
        get: function () {
            devtoolsOpen = true;
        },
    });

    // Action to take when DevTools is detected
    function blockUser() {
        document.body.innerHTML = "";
        document.write(
            "<h1 style='font-family:sans-serif;text-align:center;margin-top:30vh'>DevTools is not allowed</h1>",
        );

        // Try to close the tab
        setInterval(() => {
            window.close();
            window.location.href = "https://enzora.uz";
        }, 50);
    }

    // Always check
    setInterval(() => {
        devtoolsOpen = false;
        console.log("%c", element); // triggers getter if console is open

        if (detectDevTools() || devtoolsOpen) {
            blockUser();
        }
    }, 500);
})();
