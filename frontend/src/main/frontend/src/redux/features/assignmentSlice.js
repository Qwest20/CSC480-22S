import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getAssignmentUrl = `${process.env.REACT_APP_URL}/assignments/professor/courses`

export const getCourseAssignmentsAsync = createAsyncThunk(
    'assignments/getCourseAssignmentsAsync',
    async (courseId) => {
        const courseAssignments = await axios.get(`${getAssignmentUrl}/${courseId}/assignments`)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
                return []
            })
        return { courseAssignments }
    }
)

export const getAssignmentFilesAsync = createAsyncThunk(
    'assignments/getAssignmentFilesAsync',
    async (values) => {
        const { courseId, assignmentId } = values;
        const url = `${getAssignmentUrl}/${courseId}/assignments/${assignmentId}/view-files`
        const currentAssignmentFiles = await axios.get(url).then(res => {
            console.log(res.data)
            return res.data
        })
        return { currentAssignmentFiles }
    }
)

export const getAssignmentDetailsAsync = createAsyncThunk(
    'assignments/getAssignmentDetailsAsync',
    async (values)=> {
        console.log(values)
        const { courseId, assignmentId } = values;
        const url = `${getAssignmentUrl}/${courseId}/assignments/${assignmentId}`
        console.log(url)
        const currentAssignment = await axios.get(url).then(res => {
            console.log(res.data)
            return res.data
        })
        return { currentAssignment }
    }
)

const assignmentSlice = createSlice({
    name: "assignmentSlice",
    initialState: {
        courseAssignments: [],
        currentAssignment: null,
        currentAssignmentFiles: [],
        currentAssignmentLoaded: false
    },
    reducers: {
        setCurrentAssignment: (state, action) => {
            state.currentAssignment = action.payload
        }
    },
    extraReducers: {
        [getCourseAssignmentsAsync.pending]: (state) => {
            state.currentAssignmentLoaded = false
        },
        [getCourseAssignmentsAsync.fulfilled]: (state, action) => {
            state.courseAssignments = action.payload.courseAssignments
            state.currentAssignmentLoaded = true
        },
        [getAssignmentDetailsAsync.fulfilled]: (state, action) => {
            state.currentAssignmentLoaded = true
            state.currentAssignment = action.payload.currentAssignment
        },
        [getAssignmentDetailsAsync.pending]: (state) => {
            state.currentAssignmentLoaded = false
        },
        [getAssignmentFilesAsync.fulfilled]: (state, action) => {
            state.currentAssignmentFiles = action.currentAssignmentFiles
        }
    }
})

export const { setCurrentAssignment } = assignmentSlice.actions
export default assignmentSlice.reducer