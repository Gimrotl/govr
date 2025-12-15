import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CreateRidePayload {
  from_location: string;
  to_location: string;
  stopovers?: string[];
  date: string;
  time: string;
  price: string;
  available_seats: number;
  car_model?: string;
  car_year?: string;
  car_image?: string;
  mobile?: string;
  whatsapp?: string;
  telegram?: string;
  information?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const payload: CreateRidePayload = await req.json();
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: user, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user.user?.email) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { data, error } = await supabase
      .from("rides")
      .insert([
        {
          driver_email: user.user.email,
          from_location: payload.from_location,
          to_location: payload.to_location,
          stopovers: payload.stopovers || [],
          date: payload.date,
          time: payload.time,
          price: payload.price,
          available_seats: payload.available_seats,
          booked_seats: 0,
          car_model: payload.car_model,
          car_year: payload.car_year,
          car_image: payload.car_image,
          mobile: payload.mobile,
          whatsapp: payload.whatsapp,
          telegram: payload.telegram,
          information: payload.information,
          ip_address: clientIp,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create ride" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
