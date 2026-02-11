import { useState, useEffect } from "react";
import { superbase } from "../../SuperbaseClient"; 

export function GetCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await superbase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const parsed = data.map((car) => ({
        ...car,
        images: Array.isArray(car.images)
          ? car.images
          : JSON.parse(car.images || "[]"),
      }));

      setCars(parsed);
    } catch (err) {
      console.error("Error fetching cars:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { cars, loading, refresh: fetchCars };
}
