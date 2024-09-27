"use client";
import React, { useState, useEffect } from "react";

// Importing custom components
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Importing icons
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

// Importing symptom data
import { symptoms } from "@/data/symptoms_data";

// Defining Props type
type Props = {};

// Functional component definition
export default function FindSpecialist({}: Props) {
  // State variables initialization
  const [numberOfSymptoms, setNumberOfSymptoms] = useState(0);
  const [symptomStates, setSymptomStates] = useState(
    Array.from({ length: numberOfSymptoms }, () => ({ open: false, value: "" }))
  );

  // Effect hook to update symptom states whenever the number of symptoms changes
  useEffect(() => {
    setSymptomStates(
      Array.from({ length: numberOfSymptoms }, () => ({
        open: false,
        value: "",
      }))
    );
  }, [numberOfSymptoms]);

  // Function to handle symptom value change
  const handleSymptomChange = (index: number, value: string) => {
    setSymptomStates((prev) =>
      prev.map((state, i) => (i === index ? { ...state, value } : state))
    );
  };

  // Function to handle popover open/close state change
  const handlePopoverChange = (index: number, open: boolean) => {
    setSymptomStates((prev) =>
      prev.map((state, i) => (i === index ? { ...state, open } : state))
    );
  };

  // Array of selected symptoms
  const selectedSymptoms = symptomStates.map((state) => state.value);

  // JSX return
  return (
    <Layout>
      {/* Header section */}
      <LayoutHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Find Specialist
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </LayoutHeader>

      {/* Body section */}
      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="flex justify-center md:mt-[100px]">
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Enter your Symptoms</CardTitle>
              <CardDescription>
                to get specialist doctors recommendation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Form section */}
              <form>
                <div className="grid w-full items-center gap-4">
                  {/* Select number of symptoms section */}
                  <div className="flex flex-col space-y-1.5">
                    <Label className="pb-2" htmlFor="framework">
                      How many symptoms you want to enter?
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        setNumberOfSymptoms(Number(value));
                      }}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Symptom input section */}
                  <div className="flex flex-col gap-3">
                    {symptomStates.map((symptomState, index) => (
                      <div key={index}>
                        <div className="flex flex-col space-y-1.5">
                          <div>
                            {/* Popover for selecting symptoms */}
                            <Popover
                              open={symptomState.open}
                              onOpenChange={(open) =>
                                handlePopoverChange(index, open)
                              }
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={symptomState.open}
                                  className="w-full justify-between"
                                >
                                  {symptomState.value
                                    ? symptoms.find(
                                        (item) =>
                                          item.symptom === symptomState.value
                                      )?.symptom
                                    : `Select Symptom ${index + 1}`}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[250px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="Search Symptom..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    {/* Displaying suggestions */}
                                    <CommandEmpty>
                                      No Symptom found.
                                    </CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                      {symptoms.map((item) => (
                                        <CommandItem
                                          key={item.ID}
                                          value={item.symptom}
                                          onSelect={(currentValue) => {
                                            handleSymptomChange(
                                              index,
                                              currentValue ===
                                                symptomState.value
                                                ? ""
                                                : currentValue
                                            );
                                            handlePopoverChange(index, false);
                                          }}
                                          disabled={selectedSymptoms.includes(
                                            item.symptom
                                          )}
                                        >
                                          {item.symptom}
                                          {/* Displaying check mark for selected symptoms */}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              selectedSymptoms.includes(
                                                item.symptom
                                              )
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>

            {/* Footer section */}
            <CardFooter className="flex justify-between">
              {/* Clear button */}
              <Button
                variant="outline"
                onClick={() =>
                  setSymptomStates(
                    Array.from({ length: numberOfSymptoms }, () => ({
                      open: false,
                      value: "",
                    }))
                  )
                }
              >
                Clear
              </Button>
              {/* Find button */}
              <Button
                onClick={() => {
                  console.log(selectedSymptoms);
                }}
              >
                Find
              </Button>
            </CardFooter>
          </Card>
        </div>
      </LayoutBody>
    </Layout>
  );
}
