"use client";

import { RiEmotionLaughFill } from "@remixicon/react";
import { useState } from "react";

export default function WelcomeMessage({ total }: { total: number }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div
        role="alert"
        className="alert alert-vertical sm:alert-horizontal m-4"
      >
        <RiEmotionLaughFill size={20} />
        <div>
          <h3 className="font-bold">¡Bienvenido hagovero!</h3>
          <div className="text-xs">
            Ya somos <strong>{total}</strong> cuentas hagov que quieren hacer
            Argentina grande otra vez
          </div>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={() => setShow(false)}>
          Cerrar
        </button>
      </div>
    );
  }
}
