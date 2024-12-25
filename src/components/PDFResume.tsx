import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Link, 
  Font,
  Image as PDFImage
} from '@react-pdf/renderer';
import { ResumeValues } from '@/lib/validation';
import { formatDate } from 'date-fns';
import { BorderStyles } from '@/app/(main)/editor/BorderStyleButton';

// Register fonts
Font.register({
  family: 'Computer Modern',
  src: 'https://fonts.cdnfonts.com/s/14185/cmunrm.woff'
});

interface PDFResumeProps {
  resumeData: ResumeValues;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Computer Modern',
    padding: 30,
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  profileImage: {
    width: 100,
    height: 100,
  }
});

export function PDFResume({ resumeData }: PDFResumeProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
    githubProfile,
    linkedinProfile,
    summary,
    workExperiences,
    educations,
    projects,
    skills
  } = resumeData;

  // Helper to get full URL
  const getFullUrl = (url: string) => 
    url?.startsWith('http') ? url : `https://${url}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Info Header */}
        <View style={styles.header}>
          {photo && (
            <PDFImage 
              src={photo instanceof File ? URL.createObjectURL(photo) : photo}
              style={{
                ...styles.profileImage,
                borderRadius: 
                  borderStyle === BorderStyles.SQUARE
                    ? 0
                    : borderStyle === BorderStyles.CIRCLE
                      ? 9999
                      : 10
              }}
            />
          )}
          
          <View>
            <Text style={[styles.name, { color: colorHex }]}>
              {firstName} {lastName}
            </Text>
            <Text>{jobTitle}</Text>
            
            {/* Contact Info */}
            <View>
              <Text>
                {[city, country].filter(Boolean).join(' | ')}
                {phone ? ` | ${phone}` : ''}
              </Text>
              
              {email && (
                <Link 
                  src={`mailto:${email}`} 
                  style={styles.link}
                >
                  {email}
                </Link>
              )}
              
              {githubProfile && (
                <Link 
                  src={getFullUrl(githubProfile)} 
                  style={styles.link}
                >
                  GitHub
                </Link>
              )}
              
              {linkedinProfile && (
                <Link 
                  src={getFullUrl(linkedinProfile)} 
                  style={styles.link}
                >
                  LinkedIn
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View>
            <Text>Professional Profile</Text>
            <Text>{summary}</Text>
          </View>
        )}

        {/* Work Experiences */}
        {workExperiences?.map((exp, index) => (
          <View key={index}>
            <Text>{exp.position} at {exp.company}</Text>
            <Text>
              {exp.startDate ? formatDate(exp.startDate, "MM/yyyy") : ''} - 
              {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : 'Present'}
            </Text>
            <Text>{exp.description}</Text>
          </View>
        ))}

        {/* Projects */}
        {projects?.map((proj, index) => (
          <View key={index}>
            <Text>{proj.projectName}</Text>
            {proj.link && (
              <Link 
                src={getFullUrl(proj.link)} 
                style={styles.link}
              >
                Project Link
              </Link>
            )}
            <Text>{proj.description}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}