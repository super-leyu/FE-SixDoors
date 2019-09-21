// 计数器：统计某个数据被访问的次数
class Counter {
    constructor(prop) {
        // 记录所有被访问过的数据及次数
        this.map = {};
    }

    add(v) {
        if (!this.map[v]) {
            this.map[v] = 1;
            return;
        }
        this.map[v]++;
    }

    // 判断访问次数是否等于K次
    isEqualToKCount(v, count) {
        return this.map[v] == count;
    }

    // 访问次数超过K次
    isGreaterThanCount(v, count) {
        return this.map[v] > count;
    }

    print() {
        console.log('counter: ', this.map);
    }
}

// 初始队列
class Origin_LRU {
    constructor(prop) {
        // 缓存上限
        this.length = prop.length;
        // 加入缓存的最大访问次数
        this.count = prop.count;
        // 初始数据
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
        if (!~idx) {
            kc_l.get(k);
            return;
        };
        const result = this.cache[idx];

        // 计数器统计访问次数
        counter.add(k);

        // 访问次数等于K次时
        if (counter.isEqualToKCount(k, this.count)) {
            // 从初始缓存队列删除
            this.cache.splice(idx, 1);
            // 添加到 KCount队列
            kc_l.append(result);
        // 访问次数大于2次时，直接在KCount队列操作
        } else if (counter.isGreaterThanCount((k, this.count))) {
            kc_l.get(k)
        // 将访问过的数据移动到头部
        } else {
            this.cache.splice(idx, 1);
            this.cache.unshift(result);
        }

        return result;
    }

    print() {
        console.log('Origin_LRU: ', this.cache);
    }
}

// 达到K次访问的缓存队列
class KCount_LRU extends Origin_LRU {
    constructor(prop) {
        super(prop);
        this.length = prop.length;
        // 达到k次访问次数后的缓存数据
        this.cache = [];
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
        console.log('KCount_LRU: ', this.cache);
    }
}

const counter = new Counter()
const o_l = new Origin_LRU({
    length: 3,
    count: 3
})
const kc_l = new KCount_LRU({
    length: 2
})


o_l.append({
    k: 'a',
    v: 'aa'
})
o_l.append({
    k: 'b',
    v: 'bb'
})
o_l.append({
    k: 'c',
    v: 'cc'
})
// o_l.print() // [{ k: 'd', v: 'dd' }, { k: 'c', v: 'cc' }, { k: 'b', v: 'bb' }]

o_l.get('c')
o_l.get('c')
o_l.get('a')
o_l.get('a')
o_l.get('b')
o_l.get('b')
o_l.get('c')

counter.print()
o_l.print()
kc_l.print()