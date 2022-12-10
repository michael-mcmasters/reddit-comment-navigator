class CommentNavigator {

    constructor() {
        this.topCommentSet = new Set();
        this.topLevelComments = [];
        this.currentIndex = 0;        
    }

    enableNavigation() {
        this.addCommentsAsTheyAppear();
        this.handleKeyboardCommentScrolling();
    }

    addCommentsAsTheyAppear() {
        const observer = new MutationObserver((mutationList, observer) => {
            const eles = document.querySelectorAll("._3sf33-9rVAO_v4y0pIW_CH");
            if (eles.length > 0) {
                for (const e of eles) {
                    if (e.style.paddingLeft === "16px" && !this.topCommentSet.has(e.id)) {
                        this.topCommentSet.add(e.id);
                        this.topLevelComments.push(e);
                        console.log("Got top level comment")
                    }
                }
            }
        });
        
        const config = { attributes: true, childList: true, subtree: true };
        observer.observe(document.body, config);
    }

    handleKeyboardCommentScrolling() {
        document.body.addEventListener("keydown", (event) => {
            if (event.key !== "1" && event.key !== "2")
                return;
    
            console.log(this.topLevelComments)
            if (event.key === "1") {
                console.log("down")
                --this.currentIndex;
            } else if (event.key === "2") {
                console.log("up")
                ++this.currentIndex;
            }
    
            console.log(this.topLevelComments[this.currentIndex])
            this.topLevelComments[this.currentIndex].focus()
            this.topLevelComments[this.currentIndex].scrollIntoView(true);
            window.scrollBy(0, -45);
    
            const innerCommentEle = this.topLevelComments[this.currentIndex].querySelectorAll("._3tw__eCCe7j-epNCKGXUKk")[0];
            innerCommentEle.classList.add("_1vvFtxiq5874iIdCUYlL-d");
            // Adds border style, but j and keys will still move from another comment.
        })
    }
}