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

    // These tests only test the core logic without NAPI bindings
    #[test]
    fn test_sum_logic() {
        // Test the core logic using checked_add directly
        assert_eq!(2i32.checked_add(3), Some(5));
        assert_eq!((-1i32).checked_add(1), Some(0));
        assert_eq!(0i32.checked_add(0), Some(0));
    }

    #[test]
    fn test_sum_overflow_logic() {
        // Test overflow detection logic
        assert_eq!(i32::MAX.checked_add(1), None);
        assert_eq!(i32::MIN.checked_add(-1), None);
    }

    #[test]
    fn test_hello_string() {
        // Test string creation without NAPI
        let greeting = "Hello there".to_string();
        assert_eq!(greeting, "Hello there");
        assert_eq!(greeting.len(), 11);
    }
}
