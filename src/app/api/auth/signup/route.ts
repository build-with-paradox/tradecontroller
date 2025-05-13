import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; 
import { mongooseConnection } from "@/lib/mongoconnection";
import User from "@/models/Users";

export const handler = async (request: NextRequest) => { 
    try {

        if (request.method !== "POST") {
            return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
        }

        const { username, email, password }: { username: string; email: string; password: string } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await mongooseConnection();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "customer", 
        });

        return NextResponse.json(
            { message: "Signup successful", userId: newUser._id }, 
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 });
    }
};
