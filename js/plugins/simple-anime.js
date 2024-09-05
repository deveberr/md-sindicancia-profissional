window.SimpleAnime = class {
    constructor() {
        this.items = Array.from(document.querySelectorAll("[data-anime]"));
        this.init();
    }

    isElementInView(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    animateItems() {
        let lastAnimatedIndex = -1;

        this.items.forEach((item, index) => {
            if (this.isElementInView(item) && !item.classList.contains("anime")) {
                const delay = parseInt(item.getAttribute("data-anime"), 10);
                if (lastAnimatedIndex < index) {
                    setTimeout(() => {
                        item.classList.add("anime");
                        lastAnimatedIndex = index;
                    }, delay);
                }
            }
        });
    }

    handleScroll() {
        requestAnimationFrame(() => this.animateItems());
    }

    init() {
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener("scroll", this.handleScroll);
        this.handleScroll();
    }
};
