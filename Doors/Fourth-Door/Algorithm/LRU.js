class LRU {
    constructor(length) {
        this.length = length;
        this.cache = [];
    }

    append(val) {
        if (this.cache.length >= this.length) {
            // 缓存已满时移除那些访问频次底的数据
            this.cache.pop();
        }

        // 向前插入
        this.cache.unshift(val);
    }

    get(k) {
        const idx = this.cache.findIndex(o => o.k === k);
        if (!~idx) return;
        const result = this.cache[idx];
        // 将访问过的数据移动到头部
        this.cache.splice(idx, 1);
        this.cache.unshift(result);

        return result;
    }

    print() {
        console.log(this.cache)
    }
}

const l = new LRU(3)

l.append({
    k: 'a',
    v: 'aa'
})
l.append({
    k: 'b',
    v: 'bb'
})
l.append({
    k: 'c',
    v: 'cc'
})
// l.print() // [{ k: 'c', v: 'cc' }, { k: 'b', v: 'bb' }, { k: 'a', v: 'aa' }]
l.append({
    k: 'd',
    v: 'dd'
})
// l.print() // [{ k: 'd', v: 'dd' }, { k: 'c', v: 'cc' }, { k: 'b', v: 'bb' }]

l.get('c')
l.print() // [{ k: 'c', v: 'cc' }, { k: 'd', v: 'dd' }, { k: 'b', v: 'bb' }]