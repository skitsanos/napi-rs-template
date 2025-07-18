#![deny(clippy::all)]
#![warn(clippy::pedantic)]

use napi::Result;

#[macro_use]
extern crate napi_derive;

/// Adds two 32-bit integers with overflow checking
/// 
/// # Arguments
/// * `a` - First integer
/// * `b` - Second integer
/// 
/// # Returns
/// * `Result<i32>` - Sum of a and b, or error if overflow occurs
/// 
/// # Errors
/// Returns an error if integer overflow occurs during addition
#[napi]
#[inline]
pub fn sum(a: i32, b: i32) -> Result<i32> {
    a.checked_add(b)
        .ok_or_else(|| napi::Error::from_reason("Integer overflow in sum operation"))
}

/// Returns a greeting message
/// 
/// # Returns
/// * `String` - A greeting message
#[napi]
#[inline]
#[must_use]
pub fn hello() -> String {
    "Hello there".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sum_normal() {
        assert_eq!(sum(2, 3).unwrap(), 5);
        assert_eq!(sum(-1, 1).unwrap(), 0);
        assert_eq!(sum(0, 0).unwrap(), 0);
    }

    #[test]
    fn test_sum_overflow() {
        assert!(sum(i32::MAX, 1).is_err());
        assert!(sum(i32::MIN, -1).is_err());
    }

    #[test]
    fn test_hello() {
        assert_eq!(hello(), "Hello there");
    }
}
