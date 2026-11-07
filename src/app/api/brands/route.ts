import { NextRequest, NextResponse } from "next/server";
// http://localhost:3000/api/brands

export async function GET(request: NextRequest) {
    // some logic
    // write query 

    // fetch

    return NextResponse.json({
        message: "success",
        data: [
            { name: 'Brand 1', image: 'path of the image', id: '26dhdh63bh6' },
            { name: 'Brand 2', image: 'path of the image', id: '26dhdh63bh4' },
            { name: 'Brand 3', image: 'path of the image', id: '26dhdh63bh5' },
            { name: 'Brand 4', image: 'path of the image', id: '26dhdh63bh2' },
        ],
        results: 4
    })
}


export async function POST(request: NextRequest) {
    // some logic
    // write query 

    return NextResponse.json({
        data:
            { name: 'Brand 1', image: 'path of the image', id: '26dhdh63bh6' },

    })
}

