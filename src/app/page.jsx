"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Banner from "@/components/Banner";
import axios from "axios";
import { toast } from "sonner";

const Index = () => {
  const serviceOptions = [
    {
      service: "Monday Bible Study",
    },
    {
      service: "Tuesday Leadership Development Training ",
    },
    {
      service: "Thursday Power Night/ Revival Broadcast",
    },
    {
      service: "Saturday Workers Training",
    },
    {
      service: "Sunday Worship Service ",
    },
    {
      service: "Global Crusade With Kumuyi",
      subService: [
        {
          subServiceName: `Minister's Conference`,
          subServiceDay: ["Day 1", "Day 2", "Day 3"],
        },
        {
          subServiceName: `Crusade`,
          subServiceDay: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
        },
        {
          subServiceName: `Impact`,
          subServiceDay: [],
        },
      ],
    },
  ];
  const [formData, setFormData] = useState({
    date: null,
    serviceType: null,
    subService: null,
    subServiceDay: null,
    section: null,
    supervisor: null,
    personnelCount: null,
    volunteersCount: null,
    challenges: [" "],
    solution: null,
    equipmentDetails: null,
    remarks: null,
    location: null,
  });

  const [errors, setErrors] = useState({});
  const [challengesAdded, setChallengesAdded] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Example validation for 'date' field
    if (!formData.date) {
      newErrors.date = "Date is required";
      valid = false;
    }

    // Service Type validation
    if (!formData.serviceType) {
      newErrors.serviceType = "Service Type is required";
      valid = false;
    }

    // Section validation
    if (!formData.section) {
      newErrors.section = "Section is required";
      valid = false;
    }

    // Supervisor validation
    if (!formData.supervisor) {
      newErrors.supervisor = "Supervisor is required";
      valid = false;
    }

    // Personnel Count validation
    if (!formData.personnelCount || formData.personnelCount <= 0) {
      newErrors.personnelCount = "Personnel Count must be a positive number";
      valid = false;
    }

    // Volunteers Count validation
    if (!formData.volunteersCount || formData.volunteersCount < 0) {
      newErrors.volunteersCount =
        "Volunteers Count must be a non-negative number";
      valid = false;
    }

    // Challenges validation
    if (formData.challenges.some((challenge) => !challenge.trim())) {
      newErrors.challenges = "All Challenges must be filled out";
      valid = false;
    }

    if (!formData.solution) {
      newErrors.solution = "Solution is required";
      valid = false;
    }

    if (!formData.equipmentDetails) {
      newErrors.equipmentDetails = "Equipment Details is required";
      valid = false;
    }

    if (!formData.remarks) {
      newErrors.remarks = "Remarks is required";
      valid = false;
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleServiceTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: e.target.value,
      subService: null,
      subServiceDay: null,
    }));
  };

  const handleSubOptionChange = (e) => {
    setFormData(() => ({ ...formData, subServiceDay: e.target.value }));
  };

  const handleAdditionalOptionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      subService: e.target.value,
      subServiceDay: null,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      challenges: [...prev.challenges, ""],
    }));
    setChallengesAdded(true); // Set challengesAdded to true when challenges are added
  };

  const handleRemoveChallenge = (index) => {
    // Prevent removing the first challenge (Challenge 1)
    if (index === 0) return;
    setFormData((prev) => {
      const updatedChallenges = [...prev.challenges];
      updatedChallenges.splice(index, 1);
      return { ...prev, challenges: updatedChallenges };
    });
  };

  const handleChallengeInputChange = (index, value) => {
    setFormData((prev) => {
      const updatedChallenges = [...prev.challenges];
      updatedChallenges[index] = value;
      return { ...prev, challenges: updatedChallenges };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    if (validateForm()) {
      try {
        const response = await axios.post(
          `http://localhost:5001/api/submit-report`,
          formData
        );

        if (response.status === 201) {
          toast.success("Report submitted successfully");
          // console.log(formData);
          // Reset form data after submission as null
          setFormData({
            date: " ",
            serviceType: " ",
            subService: " ",
            subServiceDay: " ",
            section: " ",
            supervisor: " ",
            personnelCount: " ",
            volunteersCount: " ",
            challenges: [],
            solution: " ",
            equipmentDetails: " ",
            remarks: " ",
            location: " ",
          });
        } else {
          console.error("Error submitting report");
          toast.error("Error submitting report. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } else {
      // Form validation failed
      console.log("Form validation failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  w-full p-2 md:p-10 bg-blue-200">
      <Banner />
      <form
        onSubmit={handleSubmit}
        className="p-4  bg-slate-100 rounded w-full max-w-[600px] flex flex-col gap-3"
      >
        <div className="grid items-center gap-2">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            placeholder="Pick date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-1/3"
          />
          {errors.date && <Label className="text-red-500">{errors.date}</Label>}
        </div>

        <div className="gtid items-center">
          <Label htmlFor="serviceType">Service Type</Label>
          <fieldset className="grid items-center ">
            {serviceOptions.map((e) => {
              return (
                <div className="">
                  <div key={e.service} className="bg-background">
                    <div className="p-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="ServiceType"
                        id="option1"
                        value={e.service}
                        onChange={handleServiceTypeChange}
                        checked={formData.serviceType === e.service}
                      />
                      <Label className="m-1" htmlFor="option1">
                        {e.service}
                      </Label>
                    </div>
                    {e.subService && formData.serviceType === e.service
                      ? e.subService.map((e) => {
                          return (
                            <div
                              className="form-check"
                              style={{ marginLeft: "15px" }}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="additionalOptions"
                                id="option1"
                                value={e.subServiceName}
                                onChange={handleAdditionalOptionChange}
                                checked={
                                  formData.subService === e.subServiceName
                                }
                              />
                              <Label className="m-1" htmlFor="option1">
                                {e.subServiceName}
                              </Label>
                              {e.subServiceDay &&
                              e.subServiceName === formData.subService
                                ? e.subServiceDay.map((e) => {
                                    return (
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="subsub"
                                          id="option1"
                                          value={e}
                                          onChange={handleSubOptionChange}
                                          checked={formData.subServiceDay === e}
                                        />
                                        <Label
                                          className="m-1"
                                          htmlFor="option1"
                                        >
                                          {e}
                                        </Label>
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              );
            })}
          </fieldset>
          {errors.serviceType && (
            <Label className="text-red-500">{errors.serviceType}</Label>
          )}
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="section">Section</Label>
          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="w-full py-2 px-3 rounded-md"
          >
            <option value="">Select your section...</option>
            <option value="Zoom and Playback">Zoom and Playback</option>
            <option value="Teleprompting">Teleprompting</option>
            <option value="Video">Video</option>
            <option value="Audio">Audio</option>
            <option value="Streaming">Streaming</option>
            <option value="Uplink">Uplink</option>
            <option value="Graphics">Graphics</option>
          </select>
          {errors.section && (
            <Label className="text-red-500">{errors.section}</Label>
          )}
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="supervisor">Supervisor on Duty</Label>
          <Input
            type="text"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleInputChange}
          />
          {errors.supervisor && (
            <Label className="text-red-500">{errors.supervisor}</Label>
          )}
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="personnelCount">Number of Personnel on Duty</Label>
          <Input
            type="number"
            name="personnelCount"
            value={formData.personnelCount}
            onChange={handleInputChange}
          />
          {errors.personnelCount && (
            <Label className="text-red-500">{errors.personnelCount}</Label>
          )}
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="volunteersCount">Number of Volunteers on Duty</Label>
          <Input
            type="number"
            name="volunteersCount"
            value={formData.volunteersCount}
            onChange={handleInputChange}
          />
          {errors.volunteersCount && (
            <Label className="text-red-500">{errors.volunteersCount}</Label>
          )}
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="challenges">Challenges Encountered</Label>
          {formData.challenges.map((challenge, index) => (
            <div key={index} className="flex items-center gap-1">
              <Input
                type="text"
                placeholder={`Challenge ${index + 1}`}
                value={challenge}
                onChange={(e) =>
                  handleChallengeInputChange(index, e.target.value)
                }
                required={index === 0} // Make Challenge 1 required
              />

              {/* Show remove button only for additional challenges */}
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => handleRemoveChallenge(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          {errors.challenges && (
            <Label className="text-red-500">{errors.challenges}</Label>
          )}
          <Button type="button" onClick={handleAdd}>
            Add Challenge
          </Button>
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="solution">Solution Proposed</Label>
          <Input
            type="text"
            name="solution"
            value={formData.solution}
            onChange={handleInputChange}
          />
          {errors.solution && (
            <Label className="text-red-500">{errors.solution}</Label>
          )}
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="equipmentDetails">
            Any Equipment Failure or Malfunction
          </Label>
          <Input
            type="text"
            name="equipmentDetails"
            value={formData.equipmentDetails}
            onChange={handleInputChange}
          />
          {errors.equipmentDetails && (
            <Label className="text-red-500">{errors.equipmentDetails}</Label>
          )}
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="remarks">Remarks and Recommendations</Label>
          <Input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
          />
          {errors.remarks && (
            <Label className="text-red-500">{errors.remarks}</Label>
          )}
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && (
            <Label className="text-red-500">{errors.location}</Label>
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
};

export default Index;
