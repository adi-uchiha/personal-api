import type { Metadata } from "next";
import { FC } from "react";

interface ApiDashboardProps {

}

export const metadata: Metadata = {
  title: 'DashBoard'
}

const ApiDashboard: FC<ApiDashboardProps> = () => {
  return <div>ApiDashboard</div>
}

export default ApiDashboard