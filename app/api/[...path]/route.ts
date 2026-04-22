import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

function getCookieHeader(request: NextRequest): string {
  const cookies = request.cookies.getAll();
  return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}?${request.nextUrl.searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      cookie: getCookieHeader(request),
    },
    credentials: "include",
  });

  const headers = new Headers(response.headers);
  const cookie = headers.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });

  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}`;

  const contentType = request.headers.get("content-type") || "";

  let body: BodyInit | undefined;
  const headers: Record<string, string> = {
    cookie: getCookieHeader(request),
  };

  if (contentType.includes("multipart/form-data")) {
    body = await request.formData();
  } else if (contentType.includes("application/json")) {
    const text = await request.text();
    if (text) {
      body = text;
      headers["Content-Type"] = "application/json";
    }
  } else {
    body = undefined;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
    credentials: "include",
  });

  const responseHeaders = new Headers(response.headers);
  const data = await response.json();

  const nextResponse = NextResponse.json(data, {
    status: response.status,
  });

  const cookies = responseHeaders.getSetCookie?.();
  if (cookies) {
    cookies.forEach((c) => nextResponse.headers.append("set-cookie", c));
  }

  return nextResponse;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}`;

  const contentType = request.headers.get("content-type") || "";
  let body: BodyInit;
  const headers: Record<string, string> = {
    cookie: getCookieHeader(request),
  };

  if (contentType.includes("multipart/form-data")) {
    body = await request.formData();
  } else {
    headers["Content-Type"] = "application/json";
    const jsonBody = await request.json();
    body = JSON.stringify(jsonBody);
  }

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body,
    credentials: "include",
  });

  const responseHeaders = new Headers(response.headers);
  const cookie = responseHeaders.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });

  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}`;

  const contentType = request.headers.get("content-type") || "";
  let body: BodyInit;
  const headers: Record<string, string> = {
    cookie: getCookieHeader(request),
  };

  if (contentType.includes("multipart/form-data")) {
    body = await request.formData();
  } else {
    headers["Content-Type"] = "application/json";
    const jsonBody = await request.json();
    body = JSON.stringify(jsonBody);
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body,
    credentials: "include",
  });

  const responseHeaders = new Headers(response.headers);
  const cookie = responseHeaders.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });

  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}?${request.nextUrl.searchParams.toString()}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      cookie: getCookieHeader(request),
    },
    credentials: "include",
  });

  const headers = new Headers(response.headers);
  const cookie = headers.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });

  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}