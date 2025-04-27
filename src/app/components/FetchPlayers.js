import { supabase } from "@/api/supabase";

// Fetch players from Supabase
export default async function FetchPlayers(){
    const { data: playersData, error } = await supabase
    .from("elements")
    .select("*")    
    .in("element_type", [1, 2, 3, 4])
    .in("can_select", [1]);

    if (error) {
      console.error("Error fetching players..", error);
      return [];
    }
  
    return playersData; 
  }