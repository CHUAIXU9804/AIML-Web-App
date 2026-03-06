import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function Main() {
  const [mode, setMode] = React.useState("image_to_text");

  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Please make sure the image uploaded is in PNG/JPG/JPEG/WEBP format.");
      return;
    }
  

  setUploadedFile(file);

  const url = URL.createObjectURL(file);
  setPreviewUrl(url);
};

  React.useEffect(() => {
    return() => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Toolbar />

      {/* Main Content */}
      <Box flex={1} p={2}>
        <Grid container spacing={2} height="100%">
          {/* Left */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ height: "100%", p: 2}}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Mode Selection
                </Typography>

                <Divider sx={{ mb: 2}} />

              <FormControl component="fieldset" fullWidth>

                <RadioGroup
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <FormControlLabel
                    value="image_to_text"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          Image to Text OCR
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          Extracts text from images - Standard functionality 
                        </Typography>
                      </Box>

                    }
                  />
                  <FormControlLabel
                    value="emotion_sentiment"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          Image Sentiment OCR
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          Analyzes the emotion or sentiment expressed from the character in the image 
                        </Typography>
                      </Box>
                    }
                  />

                  <FormControlLabel
                    value="visual_intelligence"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          Visual Intelligence OCR
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          Analyzes the object shown in the image and extracts the text from the object
                        </Typography>

                      </Box>

                    }
                  />
                </RadioGroup>
              </FormControl>

              
            </Paper>
          </Grid>


         {/* CENTER */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} height="100%">
              
              
              {/* Center Top: Uploaded Image */}
              <Grid item xs={12} height="75%">

                <Paper sx={{ height: "100%", p: 2 }}>
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      Upload Image
                    </Typography>
                    <Divider sx={{ mb: 0.5}} />
                      <input
                        id="ocr-upload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{display: "none"}}
                      />
                    <Button 
                    variant="contained" fullWidth sx={{py: 1.5, backgroundColor: "#2BB8C2", "&:hover": 
                      {backgroundColor: "#239fa8",},
                    }} onClick={() => document.getElementById("ocr-upload-input").click()}>
                      Upload Here
                    </Button>


                  {/* Empty State */}
                  {!previewUrl ? (
                    <Box
                      flex={1}
                      display="flex"
                      flexDirection="column"
                      alignItems= "center"
                      justifyContent= "center"
                      sx={{
                        border: "1 px dashed",
                        borderColor: "divider",
                        borderRadius: 2,
                        p:2,
                      }}
                    >
                      <Typography variant="body1" fontWeight={600}>
                        No image uploaded
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload a PNG/JPG/JPEG/WEBP image to extract text
                      </Typography>
                    </Box>
                  ): (
                    <Box
                      flex={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        border: "1 px dashed",
                        borderColor: "divider",
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "background.default",
                      }}
                    >
                      <img
                        src={previewUrl}
                        alt={uploadedFile?.name || "Uploaded preview"}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  )
                }
                

                {/* File Details */}
                {uploadedFile && (
                  <Typography variant="caption" color="text.secondary">
                    {uploadedFile.name} - {(uploadedFile.size / 1024).toFixed(1)} KB
                  </Typography>
                )
                }
                <Button
                  variant="contained"
                  maxWidth
                  disabled={!uploadedFile}
                  sx={{
                    mmt: 1,
                    py: 1,
                    backgroundColor: "#067b93",
                    "&:hover": {
                      backgroundColor: "#005262",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#B2E3E7",
                      color: "#ffffff",
                    },

                  }}
                > Process Image </Button>

                </Box>
                </Paper>

              </Grid>

              {/* Center Bottom: Image OCR Settings */}
              <Grid item xs={12} height="45%">
                <Paper sx={{ height: "60%", p: 2 }}>
                  <Typography variant="h8" fontWeight={300}>
                    Image OCR Settings
                  </Typography>
                  
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* RIGHT: Results */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ height: "100%", p: 2 }}>
              <Typography variant="h6" fontWeight={700}>
                Results
              </Typography>
              <Divider sx={{ mb: 2}} />
            </Paper>
          </Grid>          

        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}