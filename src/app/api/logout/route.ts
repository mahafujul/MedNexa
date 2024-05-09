/**
 * Logout a user by deleting the token cookie.
 * 
 * @returns {NextResponse} The response indicating the status of the operation.
 */
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Create a JSON response indicating successful logout
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        },{status: 200});

        // Delete the token cookie from the response
        response.cookies.delete('token');

        // Return the response with the deleted token cookie
        return response;
    } catch (err: any) {
        // Return a JSON response for internal server error if an error occurs
        return NextResponse.json({ message: err.message, success: false }, { status: 500 });
    }
}