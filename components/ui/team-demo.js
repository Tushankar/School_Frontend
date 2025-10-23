import React from "react";
import TeamSection from "./team";

// This demo wrapper preserves the original page import while
// delegating rendering to the CMS-backed TeamSection component.
const TeamSectionDemo = () => {
  return <TeamSection />;
};

export default TeamSectionDemo;
