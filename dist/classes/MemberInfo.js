export default class MemberInfo {
    id;
    point;
    constructor(id, point) {
        this.id = id;
        this.point = point;
    }
    add(num) {
        this.point += num;
    }
}
