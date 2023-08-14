import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { MyPdf } from "../myPdf";
import { Button } from "@chakra-ui/react";
import { AiOutlinePrinter } from "react-icons/ai";

export default function PrintButton() {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => (
            <Button
              variant="outline"
              colorScheme="teal"
              _hover={{
                bg: "green.600",
              }}
              aria-label="Print"
              leftIcon={<AiOutlinePrinter />}
            >
              Print
            </Button>
          )}
          //   @ts-ignore
          content={() => componentRef}
        />

        {/* component to be printed */}

        <div style={{ display: "none" }}>
          {/* @ts-ignore */}
          <MyPdf ref={(el) => (componentRef = el)} />
        </div>
      </div>
    </>
  );
}
