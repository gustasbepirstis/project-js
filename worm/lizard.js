import { Circle } from "./circle.js"

function angleBetween(from, to) {
    return Math.atan2(to.y - from.y, to.x - from.x);
}

function shortestAngle(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
}

export class Lizard {
    constructor(target, bodySegments, speed = 300) {
        this.target = target;
        this.bodySegments = bodySegments;
        this.speed = speed;
        this.angularConstraint = 45;
    }

    move(dt) {
        // move head
        const head = this.bodySegments[0];
        const dx = this.target.x - head.x;
        const dy = this.target.y - head.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0) {
            const step = Math.min(this.speed * dt, dist);
            head.x += (dx / dist) * step;
            head.y += (dy / dist) * step;
        }

        // move body
        for (let i = 1; i < this.bodySegments.length; i++) {
            const segment = this.bodySegments[i];
            const parent = this.bodySegments[i - 1];
            const grandparent = this.bodySegments[i - 2];

            const maxAngle = this.angularConstraint * Math.PI / 180;
            let angle = angleBetween(parent, segment);
            if (grandparent) {
                const parentFacing = angleBetween(grandparent, parent);
                const deviation = shortestAngle(angle - parentFacing);
                if (Math.abs(deviation) > maxAngle) {
                    angle = parentFacing + Math.sign(deviation) * maxAngle;
                }
            }
            segment.x = parent.x + Math.cos(angle) * segment.minDistance;
            segment.y = parent.y + Math.sin(angle) * segment.minDistance;
        }
    }

    addSegment(numberToAdd, radius=24, minDistance=36) {
        for (var i = 0; i < numberToAdd; i++) {
            var last = this.bodySegments.at(-1);
            this.bodySegments.push(new Circle({
                x: last.x,
                y: last.y,
                r: radius,
                color: "#fc6",
                minDistance: minDistance,
            }));    
        }
    }

    draw(ctx) {
        for (const segment of this.bodySegments) {
            segment.draw(ctx);
        }
    }
}
