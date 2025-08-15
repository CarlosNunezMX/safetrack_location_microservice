export class Vector2 {
    constructor(
        public x: number,
        public y: number
    ){}
}

export default class Location {
    constructor(
        public location: Vector2,
        public user_uuid: string
    ){}
}