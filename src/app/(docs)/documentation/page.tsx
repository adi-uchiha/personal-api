import { Metadata } from "next";
import { FC } from "react";
import LargeHeading from '@/ui/LargeHeading'
import Paragraph from "@/components/ui/Paragraph";
import DocumentationTabs from "@/components/DocumentationTabs";

import 'simplebar-react/dist/simplebar.min.css'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Build Custom API for free'
}


const page: FC = () => {
  return <div className="container max-w-7xl mx-auto mt-12">
    <div className="flex flex-col items-center gap-6 ">
      <LargeHeading>Making a request </LargeHeading>
      <Paragraph>api/v2/documentation</Paragraph>
      <DocumentationTabs />
    </div>
  </div>
}

export default page