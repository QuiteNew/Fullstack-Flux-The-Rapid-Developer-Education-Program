// Exercise 6 — Union and Intersection Types
// Run with: npx tsc && node dist/exercise.06.js

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 6.1 — A simple union ----
type Id = number | string;

function formatId(id: Id): string {
    // Narrowing with typeof: each branch knows exactly which type it has
    return typeof id === "number" ? `#${String(id).padStart(5, "0")}` : id.toUpperCase();
}

// ---- 6.2 — A discriminated union ----
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; a: number; b: number; c: number };

type Shape = Circle | Rectangle | Triangle;

function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle": {
            // Heron's formula, from the three side lengths
            const s = (shape.a + shape.b + shape.c) / 2;
            return Math.sqrt(s * (s - shape.a) * (s - shape.b) * (s - shape.c));
        }
        default:
            return assertNever(shape);
    }
}

function perimeter(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return 2 * Math.PI * shape.radius;
        case "rectangle":
            return 2 * (shape.width + shape.height);
        case "triangle":
            return shape.a + shape.b + shape.c;
        default:
            return assertNever(shape);
    }
}

// 6.3 — Add `| { kind: "square"; side: number }` to Shape, and both switches
// above stop compiling: "Argument of type ... is not assignable to parameter
// of type 'never'". The compiler lists every function that forgot the new case.
function assertNever(value: never): never {
    throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

// ---- 6.4 — Intersections ----
type Timestamped = { createdAt: Date };
type Named = { name: string };
type NamedEvent = Named & Timestamped;

// A generic function that returns its input with a timestamp added — the
// result type is the input type AND Timestamped.
function stamp<T extends object>(item: T, now: Date = new Date()): T & Timestamped {
    return { ...item, createdAt: now };
}

// ---- 6.5 — Utility types ----
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PublicUser = Omit<User, "password">;
type UserChanges = Partial<Omit<User, "id">>;
type Role = "student" | "teacher" | "admin";

const permissions: Record<Role, readonly string[]> = {
    student: ["read"],
    teacher: ["read", "grade"],
    admin: ["read", "grade", "manage"],
};

function toPublic({ password, ...rest }: User): PublicUser {
    void password;                 // deliberately dropped
    return rest;
}

function update(user: User, changes: UserChanges): User {
    return { ...user, ...changes };
}

function can(role: Role, action: string): boolean {
    return permissions[role].includes(action);
}

function compileTimeChecks(): void {
    const circle: Shape = { kind: "circle", radius: 1 };
    // @ts-expect-error — before narrowing, only the shared `kind` is available
    circle.width;

    // @ts-expect-error — a rectangle needs both width and height
    const bad: Shape = { kind: "rectangle", width: 2 };

    // @ts-expect-error — a NamedEvent needs both parts
    const half: NamedEvent = { name: "Launch" };

    // @ts-expect-error — the id cannot be changed through update
    update({ id: 1, name: "a", email: "b", password: "c" }, { id: 2 });

    const publicUser: PublicUser = { id: 1, name: "a", email: "b" };
    // @ts-expect-error — PublicUser has no password
    publicUser.password;

    // @ts-expect-error — the Record needs every role
    const incomplete: Record<Role, string[]> = { student: [], teacher: [] };

    void bad; void half; void incomplete;
}

// ======================================================================

console.log("=== 6.1 — Union ===");
check("formatId(42)", formatId(42), "#00042");
check('formatId("ab-7")', formatId("ab-7"), "AB-7");

console.log("\n=== 6.2 — Discriminated union ===");
const round = (n: number): number => Math.round(n * 100) / 100;
check("circle area", round(area({ kind: "circle", radius: 2 })), 12.57);
check("rectangle area", area({ kind: "rectangle", width: 3, height: 4 }), 12);
check("3-4-5 triangle area", area({ kind: "triangle", a: 3, b: 4, c: 5 }), 6);
check("rectangle perimeter", perimeter({ kind: "rectangle", width: 3, height: 4 }), 14);
check("triangle perimeter", perimeter({ kind: "triangle", a: 3, b: 4, c: 5 }), 12);
const shapes: Shape[] = [
    { kind: "circle", radius: 1 },
    { kind: "rectangle", width: 2, height: 5 },
    { kind: "triangle", a: 3, b: 4, c: 5 },
];
check("total area of three shapes", round(shapes.reduce((sum, s) => sum + area(s), 0)), 19.14);

console.log("\n=== 6.4 — Intersection ===");
const launchDay = new Date(2026, 9, 19);
const launch = stamp({ name: "Launch" }, launchDay);
check("stamp keeps the original properties", launch.name, "Launch");
check("and adds createdAt", launch.createdAt.getFullYear(), 2026);
const event: NamedEvent = launch;     // a Named & Timestamped is exactly a NamedEvent
check("the stamped object is a NamedEvent", event.name, "Launch");

console.log("\n=== 6.5 — Utility types ===");
const ana: User = { id: 1, name: "Ana", email: "ana@uacs.edu.mk", password: "s3cret" };
check("toPublic drops the password", toPublic(ana), { id: 1, name: "Ana", email: "ana@uacs.edu.mk" });
check("update changes only what is given", update(ana, { email: "ana@example.com" }).email, "ana@example.com");
check("update leaves the original alone", ana.email, "ana@uacs.edu.mk");
check("teachers can grade", can("teacher", "grade"), true);
check("students cannot", can("student", "grade"), false);

void compileTimeChecks;
