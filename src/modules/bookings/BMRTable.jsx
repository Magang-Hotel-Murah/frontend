import React from "react";
import { MapPin, Edit, Trash2, Dice1 } from "lucide-react";
import { BaseTable } from "@common";

export const TABLE_CONFIG = {
  reserv: {
    prefix: "RSV",
    primaryField: {
      header: "Nama Ruangan",
      mainField: "hotel_name",
      subField: "user_id",
      subLabel: "Tamu",
    },
  },
  room: {
    prefix: "RM",
    primaryField: {
      header: "Penerbangan & Penumpang",
      mainField: "flight_number",
      subField: "user_id",
      subLabel: "Penumpang",
    },
  },
  
};