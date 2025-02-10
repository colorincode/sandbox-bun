type QueueItem = () => Promise<void>

class Queue {
    private items: QueueItem[] = [];

    enque(item: QueueItem): void {
        this.items.push(item);
    }
    dequeue(): QueueItem | undefined {
        return this.items.shift();
    }
}

export default class TypingAnimation {
    private queue: QueueItem[] = []
    element: HTMLElement
    targetElementClassname: string
    loop: boolean
    typingSpeed: number
    deletingSpeed: number
    

    constructor(
        parent: HTMLElement,
        { loop = false, typingSpeed = 50, deletingSpeed = 50, targetElementClassname = "failed"} = {}
    ) {
        
        this.targetElementClassname = targetElementClassname
        this.element = document.createElement("div")
        this.element.classList.add(this.targetElementClassname)
        parent.append(this.element)
        this.loop = loop
        this.typingSpeed = typingSpeed
        this.deletingSpeed = deletingSpeed
        
    }

    typeString(string: string) {
        this.addToQueue(resolve => {
            let i = 0
            const interval = setInterval(() => {
                this.element.append(string[i]!)
                i++
                if (i >= string.length) {
                    clearInterval(interval)
                    resolve()
                }
            }, this.typingSpeed)
        })
        return this
    }

    deleteChars(number: number) {
        this.addToQueue(resolve => {
            let i = 0
            const interval = setInterval(() => {
                this.element.innerText = this.element.innerText.substring(
                    0,
                    this.element.innerText.length - 1
                )
                i++
                if (i >= number) {
                    clearInterval(interval)
                    resolve()
                }
            }, this.deletingSpeed)
        })
        return this
    }
    deleteAll(deleteSpeed = this.deletingSpeed) {
        this.addToQueue(resolve => {
            let i = 0
            const interval = setInterval(() => {
                this.element.innerText = this.element.innerText.substring(
                    0,
                    this.element.innerText.length - 1
                )
                i++
                if (this.element.innerText.length === 0) {
                    clearInterval(interval)
                    resolve()
                }
            }, deleteSpeed)
        })
        return this
    }
    pauseFor(duration: number) {
        this.addToQueue(resolve => {
            setTimeout(resolve, duration)
        })
        return this
    }
    newLine() {
        this.addToQueue(resolve => {
            let i = 0
            const interval = setInterval(() => {
                this.element.append("\n")
                i++
                if (i >= length) {
                    clearInterval(interval)
                    resolve()
                }
            }, this.typingSpeed)
        })
        return this
    }
    tabIndent() {
        this.addToQueue(resolve => {
            let i = 0
            const interval = setInterval(() => {
                this.element.append("\t")
                i++
                if (i >= length) {
                    clearInterval(interval)
                    resolve()
                }
            }, this.typingSpeed)
        })
        return this
    }
    async start() {
        let cb = this.queue.shift()
        while (cb != null) {
            await cb() 
            if (this.loop) this.queue.push(cb)
            cb = this.queue.shift()
        }
        return this
    }
    addToQueue(cb: (resolve: () => void) => void) {
        this.queue.push(() => new Promise(cb))
    }
}
