import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import numpy as np

# Step 1: Load and preprocess the dataset
# You can replace this with your own dataset if you have one
# For this example, we'll use the breast cancer dataset from sklearn

data = load_breast_cancer()  # Replace with your own dataset if needed
X = data.data  # Features
y = data.target  # Target labels (0 = malignant, 1 = benign)