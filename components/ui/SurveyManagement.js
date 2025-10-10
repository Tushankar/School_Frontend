import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Parent Survey Table
const ParentSurveyTable = ({ setSelected }) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/surveys/parent');
      const data = await response.json();
      if (data.success) {
        setSurveys(data.surveys);
      }
    } catch (error) {
      console.error('Error fetching surveys:', error);
      toast.error('Failed to load surveys');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Parent Surveys</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Relationship</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading...
              </TableCell>
            </TableRow>
          ) : surveys.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                No surveys found
              </TableCell>
            </TableRow>
          ) : (
            surveys.map((s) => (
              <TableRow key={s._id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.relationship}</TableCell>
                <TableCell>{s.studentGrade}</TableCell>
                <TableCell>{new Date(s.submittedAt).toLocaleDateString()}</TableCell>
                <TableCell className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setSelected(`parent-survey-detail-${s._id}`)}>
                    <User className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Staff Survey Table
const StaffSurveyTable = ({ setSelected }) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/surveys/staff');
      const data = await response.json();
      if (data.success) setSurveys(data.surveys);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load surveys');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Staff Surveys</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Department</TableHead><TableHead>Submitted</TableHead><TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading...
              </TableCell>
            </TableRow>
          ) : surveys.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                No surveys found
              </TableCell>
            </TableRow>
          ) : (
            surveys.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.role}</TableCell>
                <TableCell>{s.department}</TableCell>
                <TableCell>{new Date(s.submittedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => setSelected(`staff-survey-detail-${s._id}`)}>
                    <User className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Student Survey Table
const StudentSurveyTable = ({ setSelected }) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/surveys/student');
      const data = await response.json();
      if (data.success) setSurveys(data.surveys);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load surveys');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Student Surveys</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead><TableHead>Grade</TableHead><TableHead>Section</TableHead><TableHead>Submitted</TableHead><TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading...
              </TableCell>
            </TableRow>
          ) : surveys.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                No surveys found
              </TableCell>
            </TableRow>
          ) : (
            surveys.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.grade}</TableCell>
                <TableCell>{s.section}</TableCell>
                <TableCell>{new Date(s.submittedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => setSelected(`student-survey-detail-${s._id}`)}>
                    <User className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Parent Survey Detail View
const ParentSurveyDetailView = ({ surveyId, setSelected }) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSurvey();
  }, [surveyId]);

  const fetchSurvey = async () => {
    try {
      const id = surveyId.replace('parent-survey-detail-', '');
      const response = await fetch(`http://localhost:4000/api/surveys/parent/${id}`);
      const data = await response.json();
      if (data.success) setSurvey(data.survey);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load survey');
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!survey) return <div className="p-6">Survey not found</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Parent Survey Details</h2>
        <Button 
          variant="outline" 
          onClick={() => setSelected("Parent Surveys")}
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 px-4 py-2 font-medium"
        >
          ← Back to List
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div><label className="font-semibold">Name:</label><p>{survey.name}</p></div>
        <div><label className="font-semibold">Relationship:</label><p>{survey.relationship}</p></div>
        <div><label className="font-semibold">Student Grade:</label><p>{survey.studentGrade}</p></div>
        <div><label className="font-semibold">Education Quality:</label><p className="capitalize">{survey.educationQuality}</p></div>
        <div><label className="font-semibold">Communication:</label><p className="capitalize">{survey.communication}</p></div>
        <div><label className="font-semibold">Safety Measures:</label><p className="capitalize">{survey.safetyMeasures}</p></div>
        <div><label className="font-semibold">Activities:</label><p className="capitalize">{survey.activities}</p></div>
        <div><label className="font-semibold">Facilities:</label><p className="capitalize">{survey.facilities}</p></div>
        <div><label className="font-semibold">Admissions/Fees:</label><p className="capitalize">{survey.admissionsFees}</p></div>
        <div className="col-span-2"><label className="font-semibold">Suggestions:</label><p>{survey.suggestions || 'None'}</p></div>
      </div>
    </div>
  );
};

// Staff Survey Detail View
const StaffSurveyDetailView = ({ surveyId, setSelected }) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSurvey();
  }, [surveyId]);

  const fetchSurvey = async () => {
    try {
      const id = surveyId.replace('staff-survey-detail-', '');
      const response = await fetch(`http://localhost:4000/api/surveys/staff/${id}`);
      const data = await response.json();
      if (data.success) setSurvey(data.survey);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load survey');
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!survey) return <div className="p-6">Survey not found</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Staff Survey Details</h2>
        <Button 
          variant="outline" 
          onClick={() => setSelected("Staff Surveys")}
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 px-4 py-2 font-medium"
        >
          ← Back to List
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div><label className="font-semibold">Name:</label><p>{survey.name}</p></div>
        <div><label className="font-semibold">Role:</label><p className="capitalize">{survey.role}</p></div>
        <div><label className="font-semibold">Department:</label><p>{survey.department}</p></div>
        <div><label className="font-semibold">Workplace Environment:</label><p className="capitalize">{survey.workplaceEnvironment}</p></div>
        <div><label className="font-semibold">Training Opportunities:</label><p className="capitalize">{survey.trainingOpportunities}</p></div>
        <div><label className="font-semibold">Management Support:</label><p className="capitalize">{survey.managementSupport}</p></div>
        <div><label className="font-semibold">Teaching Resources:</label><p className="capitalize">{survey.teachingResources}</p></div>
        <div><label className="font-semibold">Communication:</label><p className="capitalize">{survey.communication}</p></div>
        <div className="col-span-2"><label className="font-semibold">Suggestions:</label><p>{survey.suggestions || 'None'}</p></div>
      </div>
    </div>
  );
};

// Student Survey Detail View
const StudentSurveyDetailView = ({ surveyId, setSelected }) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchSurvey();
  }, [surveyId]);

  const fetchSurvey = async () => {
    try {
      const id = surveyId.replace('student-survey-detail-', '');
      const response = await fetch(`http://localhost:4000/api/surveys/student/${id}`);
      const data = await response.json();
      if (data.success) setSurvey(data.survey);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load survey');
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!survey) return <div className="p-6">Survey not found</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Student Survey Details</h2>
        <Button 
          variant="outline" 
          onClick={() => setSelected("Student Surveys")}
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 px-4 py-2 font-medium"
        >
          ← Back to List
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div><label className="font-semibold">Name:</label><p>{survey.name}</p></div>
        <div><label className="font-semibold">Grade:</label><p className="capitalize">{survey.grade}</p></div>
        <div><label className="font-semibold">Section:</label><p className="capitalize">{survey.section}</p></div>
        <div><label className="font-semibold">Teaching Quality:</label><p className="capitalize">{survey.teachingQuality}</p></div>
        <div><label className="font-semibold">Academic Support:</label><p className="capitalize">{survey.academicSupport}</p></div>
        <div><label className="font-semibold">Campus Facilities:</label><p className="capitalize">{survey.campusFacilities}</p></div>
        <div><label className="font-semibold">Activities:</label><p className="capitalize">{survey.activities}</p></div>
        <div><label className="font-semibold">Grievance Mechanisms:</label><p className="capitalize">{survey.grievanceMechanisms}</p></div>
        <div><label className="font-semibold">Learning Environment:</label><p className="capitalize">{survey.learningEnvironment}</p></div>
        <div className="col-span-2"><label className="font-semibold">Suggestions:</label><p>{survey.suggestions || 'None'}</p></div>
      </div>
    </div>
  );
};

export { 
  ParentSurveyTable, 
  StaffSurveyTable, 
  StudentSurveyTable,
  ParentSurveyDetailView,
  StaffSurveyDetailView,
  StudentSurveyDetailView
};
